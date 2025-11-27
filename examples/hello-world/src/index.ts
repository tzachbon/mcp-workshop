import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'hello-world',
  version: '1.0.0',
});

// Simple greeting tool
server.registerTool(
  'greet',
  {
    title: 'Greet',
    description: 'Greet someone by name',
    inputSchema: {
      name: z.string().describe('The name of the person to greet'),
    },
    outputSchema: {
      greeting: z.string(),
    },
  },
  async ({ name }: { name: string }) => {
    const output = { greeting: `Hello, ${name}! Welcome to MCP.` };
    return {
      content: [{ type: 'text', text: output.greeting }],
      structuredContent: output,
    };
  },
);

// Connect via stdio for Cursor
const transport = new StdioServerTransport();
await server.connect(transport);
