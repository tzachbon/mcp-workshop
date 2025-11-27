# Airtable MCP Server (Non-Engineer Track)

## Goal

Create an MCP server that can read and write to your Airtable base.

## Before You Start

You need:
1. **Airtable account** - Free at [airtable.com](https://airtable.com)
2. **A base with data** - Any table works (tasks, contacts, etc.)
3. **Personal Access Token** - See instructions below

## Get Your Airtable Credentials

### Step 1: Create Personal Access Token

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click **"Create new token"**
3. Name: "MCP Workshop"
4. Scopes: Add `data.records:read` and `data.records:write`
5. Access: Select your base
6. Click **Create token**
7. **Copy the token** (starts with `pat_`) - save it somewhere safe!

### Step 2: Get Your Base ID

1. Open your base in Airtable
2. Look at the URL: `https://airtable.com/appXXXXXXXXXXXXX/...`
3. Copy the part starting with `app` (that's your Base ID)

### Step 3: Know Your Table Name

The exact name of the table you want to use (e.g., "Tasks", "Contacts")

## Prompt

Copy and paste this entire prompt into Cursor:

---

**Create a complete Airtable MCP server for me.**

**Project location:** Create in a new folder called `airtable-mcp` in my current workspace.

**Required files:**

**1. package.json:**
```json
{
  "name": "airtable-mcp",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "npx -y ts-node --esm src/index.ts"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "ts-node": "^10.9.0",
    "typescript": "^5.3.0"
  }
}
```

**2. tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

**3. src/index.ts:**
```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Tasks';

if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
    console.error('Missing required environment variables: AIRTABLE_PAT and AIRTABLE_BASE_ID');
    process.exit(1);
}

const server = new McpServer({
    name: 'airtable-server',
    version: '1.0.0'
});

const baseUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
const headers = {
    'Authorization': `Bearer ${AIRTABLE_PAT}`,
    'Content-Type': 'application/json'
};

server.registerTool(
    'list-records',
    {
        title: 'List Records',
        description: 'List all records from the Airtable table',
        inputSchema: {
            maxRecords: z.number().optional().describe('Maximum records to return')
        },
        outputSchema: {
            records: z.array(z.object({ id: z.string(), fields: z.record(z.any()) })),
            count: z.number()
        }
    },
    async ({ maxRecords = 100 }) => {
        const response = await fetch(`${baseUrl}?maxRecords=${maxRecords}`, { headers });
        if (!response.ok) {
            return { content: [{ type: 'text', text: `Error: ${await response.text()}` }], isError: true };
        }
        const data = await response.json();
        const output = {
            records: data.records.map((r: any) => ({ id: r.id, fields: r.fields })),
            count: data.records.length
        };
        return { content: [{ type: 'text', text: JSON.stringify(output, null, 2) }], structuredContent: output };
    }
);

server.registerTool(
    'get-record',
    {
        title: 'Get Record',
        description: 'Get a single record by ID',
        inputSchema: { recordId: z.string().describe('The record ID (starts with "rec")') },
        outputSchema: { id: z.string(), fields: z.record(z.any()) }
    },
    async ({ recordId }) => {
        const response = await fetch(`${baseUrl}/${recordId}`, { headers });
        if (!response.ok) {
            return { content: [{ type: 'text', text: `Error: ${await response.text()}` }], isError: true };
        }
        const data = await response.json();
        const output = { id: data.id, fields: data.fields };
        return { content: [{ type: 'text', text: JSON.stringify(output, null, 2) }], structuredContent: output };
    }
);

server.registerTool(
    'create-record',
    {
        title: 'Create Record',
        description: 'Create a new record',
        inputSchema: { fields: z.record(z.any()).describe('Object with field names and values') },
        outputSchema: { id: z.string(), fields: z.record(z.any()) }
    },
    async ({ fields }) => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify({ fields })
        });
        if (!response.ok) {
            return { content: [{ type: 'text', text: `Error: ${await response.text()}` }], isError: true };
        }
        const data = await response.json();
        const output = { id: data.id, fields: data.fields };
        return { content: [{ type: 'text', text: `Created: ${JSON.stringify(output, null, 2)}` }], structuredContent: output };
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

**After creating files, run:**
```bash
cd airtable-mcp
npm install
```

**Then find my absolute path:**
```bash
pwd
```

**Create a Cursor MCP configuration with my credentials:**

I will provide you with:
- My AIRTABLE_PAT (Personal Access Token)
- My AIRTABLE_BASE_ID
- My AIRTABLE_TABLE_NAME

Show me the exact JSON to add to Cursor settings, including the `env` section for these credentials.

**Success criteria:**
- All files created
- npm install succeeds
- I can add the server to Cursor with my credentials
- I can ask "list my Airtable records" and see results

---

## After Running the Prompt

Cursor will create the files. You'll then need to:

1. **Provide your credentials** when Cursor asks
2. **Add the configuration to Cursor** with your token in the `env` section:

```json
{
  "mcpServers": {
    "airtable": {
      "command": "npx",
      "args": ["-y", "ts-node", "--esm", "/YOUR/PATH/airtable-mcp/src/index.ts"],
      "env": {
        "AIRTABLE_PAT": "pat_your_token_here",
        "AIRTABLE_BASE_ID": "appYourBaseId",
        "AIRTABLE_TABLE_NAME": "YourTableName"
      }
    }
  }
}
```

3. **Restart Cursor**
4. **Test it:** "List my Airtable records"

## Troubleshooting

**"Missing environment variables" error?**
- Make sure the `env` section is in your Cursor config
- Double-check your PAT and Base ID

**"INVALID_PERMISSIONS" error?**
- Your PAT needs `data.records:read` and `data.records:write` scopes
- Make sure you added your base to the token's access list

**"TABLE_NOT_FOUND" error?**
- Check the exact table name (case-sensitive)
- Update `AIRTABLE_TABLE_NAME` in your Cursor config

**Records not showing?**
- Make sure your table has data
- Try creating a record first: "Create a record with Name = Test"

## What You Built

| Tool | What it does |
|------|--------------|
| `list-records` | Shows all records from your table |
| `get-record` | Gets one record by its ID |
| `create-record` | Adds a new record to your table |

