import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
    name: 'my-mcp-server',
    version: '1.0.0'
});

// Greeting tool
server.registerTool(
    'greet',
    {
        title: 'Greet',
        description: 'Greet someone by name',
        inputSchema: {
            name: z.string().describe('The name of the person to greet')
        },
        outputSchema: {
            greeting: z.string()
        }
    },
    async ({ name }) => {
        const output = { greeting: `Hello, ${name}! Welcome to MCP.` };
        return {
            content: [{ type: 'text', text: output.greeting }],
            structuredContent: output
        };
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);
