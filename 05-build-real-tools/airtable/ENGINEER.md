# Airtable MCP Server (Engineer Track)

## Goal

Build an MCP server that connects to Airtable, understanding each component as you go.

## Step 1: Project setup

Copy the starter template and install dependencies:

```bash
cp -r starter-template airtable-mcp
cd airtable-mcp
npm install
```

Open `airtable-mcp/src/index.ts`. You'll see the MCP SDK boilerplate:

```ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
    name: 'my-mcp-server',
    version: '1.0.0'
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

This is the shell. You'll add tools between the server creation and transport connection.

## Step 2: Understand the Airtable API

Before writing code, understand what you're calling.

**Base URL pattern:**
```
https://api.airtable.com/v0/{baseId}/{tableIdOrName}
```

**Authentication:** Bearer token in the `Authorization` header.

**Example request:**
```bash
curl "https://api.airtable.com/v0/appXXX/Tasks" \
  -H "Authorization: Bearer pat_xxx"
```

**Response shape:**
```json
{
  "records": [
    {
      "id": "recABC123",
      "createdTime": "2024-01-15T10:00:00.000Z",
      "fields": {
        "Name": "My Task",
        "Status": "In Progress"
      }
    }
  ]
}
```

Key points:
- `id` is always `rec` + 14 characters
- `fields` is dynamic, it contains whatever columns your table has
- The API uses query params for filtering/pagination

## Step 3: Add environment config

Add this at the top of your file, after the imports:

```ts
const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Tasks';

if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
  console.error('Missing required environment variables: AIRTABLE_PAT and AIRTABLE_BASE_ID');
  process.exit(1);
}
```

This pattern is called "fail fast". If credentials are missing, the server exits immediately with a clear error instead of failing later with a cryptic message.

Now add the base URL and headers you'll reuse across all tools:

```ts
const baseUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
  AIRTABLE_TABLE_NAME,
)}`;

const headers = {
  Authorization: `Bearer ${AIRTABLE_PAT}`,
  'Content-Type': 'application/json',
};
```

Note: `encodeURIComponent` handles table names with spaces or special characters.

## Step 4: Build the list-records tool

**API docs:** https://airtable.com/developers/web/api/list-records

This tool lists all records from your table. Add it after your headers config:

```ts
server.registerTool(
  'list-records',
  {
    title: 'List Records',
    description: 'List all records from the Airtable table',
    inputSchema: {
      maxRecords: z.number().optional().describe('Maximum records to return'),
    },
    outputSchema: {
      records: z.array(z.object({ id: z.string(), fields: z.record(z.any()) })),
      count: z.number(),
    },
  },
  async ({ maxRecords = 100 }) => {
    const response = await fetch(`${baseUrl}?maxRecords=${maxRecords}`, { headers });
    if (!response.ok) {
      return {
        content: [{ type: 'text', text: `Error: ${await response.text()}` }],
        isError: true,
      };
    }
    const data = await response.json();
    const output = {
      records: data.records.map((r: any) => ({ id: r.id, fields: r.fields })),
      count: data.records.length,
    };
    return {
      content: [{ type: 'text', text: JSON.stringify(output, null, 2) }],
      structuredContent: output,
    };
  },
);
```

**Schema notes:**
- `z.record(z.any())` handles dynamic fields since every Airtable table has different columns
- `outputSchema` defines what structured data the tool returns
- Both `content` (text for display) and `structuredContent` (typed data) are returned

## Step 5: Build the get-record tool

**API docs:** https://airtable.com/developers/web/api/get-record

Fetches a single record by ID:

```ts
server.registerTool(
  'get-record',
  {
    title: 'Get Record',
    description: 'Get a single record by ID',
    inputSchema: { recordId: z.string().describe('The record ID (starts with "rec")') },
    outputSchema: { id: z.string(), fields: z.record(z.any()) },
  },
  async ({ recordId }) => {
    const response = await fetch(`${baseUrl}/${recordId}`, { headers });
    if (!response.ok) {
      return {
        content: [{ type: 'text', text: `Error: ${await response.text()}` }],
        isError: true,
      };
    }
    const data = await response.json();
    const output = { id: data.id, fields: data.fields };
    return {
      content: [{ type: 'text', text: JSON.stringify(output, null, 2) }],
      structuredContent: output,
    };
  },
);
```

The pattern is similar: fetch, check response, transform, return both content types.

## Step 6: Build the create-record tool

**API docs:** https://airtable.com/developers/web/api/create-records

This is a write operation using POST:

```ts
server.registerTool(
  'create-record',
  {
    title: 'Create Record',
    description: 'Create a new record',
    inputSchema: { fields: z.record(z.any()).describe('Object with field names and values') },
    outputSchema: { id: z.string(), fields: z.record(z.any()) },
  },
  async ({ fields }) => {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ fields }),
    });
    if (!response.ok) {
      return {
        content: [{ type: 'text', text: `Error: ${await response.text()}` }],
        isError: true,
      };
    }
    const data = await response.json();
    const output = { id: data.id, fields: data.fields };
    return {
      content: [{ type: 'text', text: `Created: ${JSON.stringify(output, null, 2)}` }],
      structuredContent: output,
    };
  },
);
```

The input is `z.record(z.any())` because field names depend on your table structure.

## Step 7: Configure Cursor

Update your MCP config. Find the absolute path to your project:

```bash
cd airtable-mcp && pwd
```

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "airtable": {
      "command": "npx",
      "args": [
        "-y", "ts-node", "--esm", "/absolute/path/to/airtable-mcp/src/index.ts"
      ],
      "env": {
        "AIRTABLE_PAT": "pat_your_token_here",
        "AIRTABLE_BASE_ID": "appYourBaseId",
        "AIRTABLE_TABLE_NAME": "tblYourTableId"
      }
    }
  }
}
```

Reload Cursor (Cmd+Shift+P, type "Reload Window").

## Step 8: Test your tools

Try these in Cursor chat:
- "List all records from my Airtable"
- "Get the record with ID recXXXXXX" (use a real ID from the list)
- "Create a new record with Name set to 'Test from MCP'"

## Extension challenges

Try adding these tools yourself:

| Tool | API Docs |
|------|----------|
| Update record | https://airtable.com/developers/web/api/update-record |
| Delete record | https://airtable.com/developers/web/api/delete-record |

Hints:
- Update uses PATCH method
- Delete uses DELETE method
- Both need a record ID in the URL path

## Reference

Complete implementation: `examples/airtable/src/index.ts`
