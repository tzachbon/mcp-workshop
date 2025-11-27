# Airtable MCP Server (Engineer Track)

## Setup

```bash
mkdir airtable-mcp
cd airtable-mcp
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript ts-node @types/node
```

Update `package.json`:
```json
{
  "type": "module",
  "scripts": {
    "start": "npx -y ts-node --esm src/index.ts"
  }
}
```

Create `tsconfig.json`:
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

## Implementation

Create `src/index.ts`:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Environment variables (set in Cursor MCP config)
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

// Base URL and headers for all requests
const baseUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
const headers = {
    'Authorization': `Bearer ${AIRTABLE_PAT}`,
    'Content-Type': 'application/json'
};

// Tool 1: List records
server.registerTool(
    'list-records',
    {
        title: 'List Records',
        description: 'List all records from the Airtable table',
        inputSchema: {
            maxRecords: z.number().optional().describe('Maximum records to return (default: 100)')
        },
        outputSchema: {
            records: z.array(z.object({
                id: z.string(),
                fields: z.record(z.any())
            })),
            count: z.number()
        }
    },
    async ({ maxRecords = 100 }) => {
        const response = await fetch(`${baseUrl}?maxRecords=${maxRecords}`, { headers });
        
        if (!response.ok) {
            const error = await response.text();
            return {
                content: [{ type: 'text', text: `Airtable error: ${error}` }],
                isError: true
            };
        }

        const data = await response.json();
        
        const output = {
            records: data.records.map((r: any) => ({ id: r.id, fields: r.fields })),
            count: data.records.length
        };

        return {
            content: [{ type: 'text', text: JSON.stringify(output, null, 2) }],
            structuredContent: output
        };
    }
);

// Tool 2: Get single record
server.registerTool(
    'get-record',
    {
        title: 'Get Record',
        description: 'Get a single record by its Airtable ID',
        inputSchema: {
            recordId: z.string().describe('The record ID (starts with "rec")')
        },
        outputSchema: {
            id: z.string(),
            fields: z.record(z.any())
        }
    },
    async ({ recordId }) => {
        const response = await fetch(`${baseUrl}/${recordId}`, { headers });
        
        if (!response.ok) {
            const error = await response.text();
            return {
                content: [{ type: 'text', text: `Airtable error: ${error}` }],
                isError: true
            };
        }

        const data = await response.json();
        
        const output = {
            id: data.id,
            fields: data.fields
        };

        return {
            content: [{ type: 'text', text: JSON.stringify(output, null, 2) }],
            structuredContent: output
        };
    }
);

// Tool 3: Create record
server.registerTool(
    'create-record',
    {
        title: 'Create Record',
        description: 'Create a new record in the Airtable table',
        inputSchema: {
            fields: z.record(z.any()).describe('Object with field names and values')
        },
        outputSchema: {
            id: z.string(),
            fields: z.record(z.any())
        }
    },
    async ({ fields }) => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify({ fields })
        });
        
        if (!response.ok) {
            const error = await response.text();
            return {
                content: [{ type: 'text', text: `Airtable error: ${error}` }],
                isError: true
            };
        }

        const data = await response.json();
        
        const output = {
            id: data.id,
            fields: data.fields
        };

        return {
            content: [{ type: 'text', text: `Created: ${JSON.stringify(output, null, 2)}` }],
            structuredContent: output
        };
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

## Key Concepts

### Reading Environment Variables

```typescript
const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
```

Environment variables are passed from Cursor's MCP config. Never hardcode API keys!

### Validation at Startup

```typescript
if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
    console.error('Missing required environment variables');
    process.exit(1);
}
```

Fail fast if required config is missing.

### Authorization Header

```typescript
const headers = {
    'Authorization': `Bearer ${AIRTABLE_PAT}`,
    'Content-Type': 'application/json'
};
```

Airtable uses Bearer token authentication.

### Dynamic Field Schemas

```typescript
fields: z.record(z.any())
```

Since Airtable tables have user-defined fields, we use `z.record(z.any())` to accept any field structure.

## Cursor Configuration

Add to your Cursor MCP settings with environment variables:

```json
{
  "mcpServers": {
    "airtable": {
      "command": "npx",
      "args": ["-y", "ts-node", "--esm", "/path/to/airtable-mcp/src/index.ts"],
      "env": {
        "AIRTABLE_PAT": "pat_your_actual_token_here",
        "AIRTABLE_BASE_ID": "appYourBaseId",
        "AIRTABLE_TABLE_NAME": "Tasks"
      }
    }
  }
}
```

## Test It

In Cursor chat:
- "List all records from my Airtable"
- "Create a new task called 'Learn MCP'"
- "Get the record with ID recXXXXXX"

## Extend It

Ideas for more tools:
- `update-record` - Update an existing record
- `delete-record` - Delete a record
- `search-records` - Filter records by field value
- `list-tables` - List all tables in the base

