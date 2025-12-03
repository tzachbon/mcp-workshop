# Create Your First MCP Server

Now let's add a tool to your MCP server.

## What You'll Learn

- How to register a tool
- Input and output schemas with Zod
- Returning results from tools

## Tool Anatomy

Every MCP tool has:

```typescript
server.registerTool(
    'tool-name',           // Unique identifier
    {
        title: 'Display Name',
        description: 'What this tool does',
        inputSchema: { /* parameters */ },
        outputSchema: { /* return type */ }
    },
    async (inputs) => {
        // Tool logic here
        return { content: [...], structuredContent: {...} };
    }
);
```

## Choose Your Track

- **Engineers**: Follow [ENGINEER.md](./ENGINEER.md) for detailed explanations
- **Non-Engineers**: Follow [NON-ENGINEER.md](./NON-ENGINEER.md) for a ready-to-use prompt

## The Tool We'll Build

A simple **greet** tool that:
- Takes a `name` parameter (string)
- Returns a greeting message

Example:
- Input: `{ name: "Alice" }`
- Output: `"Hello, Alice! Welcome to MCP."`

## Next Step

After creating the tool, continue to [04-connect-to-cursor](../04-connect-to-cursor/) to test it in Cursor.
