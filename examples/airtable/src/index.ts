import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Load environment variables
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

const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

const headers = {
    'Authorization': `Bearer ${AIRTABLE_PAT}`,
    'Content-Type': 'application/json'
};

// List records from Airtable
server.registerTool(
    'list-records',
    {
        title: 'List Records',
        description: 'List all records from the Airtable table',
        inputSchema: {
            maxRecords: z.number().optional().describe('Maximum number of records to return (default: 100)')
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
        const response = await fetch(`${airtableUrl}?maxRecords=${maxRecords}`, { headers });
        
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

// Get a single record by ID
server.registerTool(
    'get-record',
    {
        title: 'Get Record',
        description: 'Get a single record by its Airtable ID',
        inputSchema: {
            recordId: z.string().describe('The Airtable record ID (starts with "rec")')
        },
        outputSchema: {
            id: z.string(),
            fields: z.record(z.any())
        }
    },
    async ({ recordId }) => {
        const response = await fetch(`${airtableUrl}/${recordId}`, { headers });
        
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

// Create a new record
server.registerTool(
    'create-record',
    {
        title: 'Create Record',
        description: 'Create a new record in the Airtable table',
        inputSchema: {
            fields: z.record(z.any()).describe('Object containing field names and values')
        },
        outputSchema: {
            id: z.string(),
            fields: z.record(z.any())
        }
    },
    async ({ fields }) => {
        const response = await fetch(airtableUrl, {
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
            content: [{ type: 'text', text: `Created record: ${JSON.stringify(output, null, 2)}` }],
            structuredContent: output
        };
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);


