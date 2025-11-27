# Create Your First MCP Server (Non-Engineer Track)

## Goal

Add a greeting tool to your MCP server.

## Prompt

Copy and paste this entire prompt into Cursor:

---

**Update my MCP server to include a greeting tool.**

**File to modify:** `my-mcp-server/src/index.ts`

**Replace the entire contents with:**

```typescript
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
```

**What this tool does:**
- Tool name: `greet`
- Input: Takes a `name` parameter (text)
- Output: Returns a greeting like "Hello, Alice! Welcome to MCP."

**Success criteria:**
- The file is saved without errors
- No red underlines in the editor (after a moment for TypeScript to check)

---

## Expected Outcome

After running this prompt, your server will have a `greet` tool that:
- Accepts a name
- Returns a personalized greeting

## Understanding What Changed

| Part | What it does |
|------|--------------|
| `import { z } from 'zod'` | Imports the schema library |
| `server.registerTool(...)` | Adds a new tool to the server |
| `inputSchema: { name: z.string() }` | Defines that the tool needs a "name" text input |
| `outputSchema: { greeting: z.string() }` | Defines that the tool returns a "greeting" text |
| `async ({ name }) => { ... }` | The function that runs when the tool is called |

## Troubleshooting

**Red underlines in the editor?**
- Wait a few seconds for TypeScript to process
- If they persist, make sure `npm install` was run in the project folder

**File not found?**
- Make sure you created the project in step 02
- Check that you're in the right workspace

## Next Step

Continue to [04-connect-to-cursor](../04-connect-to-cursor/NON-ENGINEER.md) to connect your server to Cursor.


