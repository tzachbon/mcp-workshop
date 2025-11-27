import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Create your MCP server
const server = new McpServer({
    name: 'my-mcp-server',
    version: '1.0.0'
});

// Register your first tool here
// Example:
// server.registerTool(
//     'tool-name',
//     {
//         title: 'Tool Title',
//         description: 'What this tool does',
//         inputSchema: { param: z.string() },
//         outputSchema: { result: z.string() }
//     },
//     async ({ param }) => {
//         const output = { result: `You said: ${param}` };
//         return {
//             content: [{ type: 'text', text: JSON.stringify(output) }],
//             structuredContent: output
//         };
//     }
// );

// Connect via stdio (required for Cursor)
const transport = new StdioServerTransport();
await server.connect(transport);


