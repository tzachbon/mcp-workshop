# Create Your First MCP Server (Engineer Track)

## Add a Tool to Your Server

Open `src/index.ts` and update it:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
    name: 'my-mcp-server',
    version: '1.0.0'
});

// Register the greet tool
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

## Understanding the Code

### Import Zod

```typescript
import { z } from 'zod';
```

Zod is a schema validation library. It defines what inputs your tool accepts and what outputs it returns.

### Register a Tool

```typescript
server.registerTool(
    'greet',              // Tool name (used by AI to call it)
    { ... },              // Metadata (title, description, schemas)
    async ({ name }) => { // Handler function
        // Your logic here
    }
);
```

### Input Schema

```typescript
inputSchema: {
    name: z.string().describe('The name of the person to greet')
}
```

- `z.string()` - The parameter must be a string
- `.describe()` - Helps the AI understand what to pass

Common Zod types:
- `z.string()` - Text
- `z.number()` - Numbers
- `z.boolean()` - True/false
- `z.array(z.string())` - Array of strings
- `z.object({ key: z.string() })` - Nested object
- `z.string().optional()` - Optional parameter

### Output Schema

```typescript
outputSchema: {
    greeting: z.string()
}
```

Defines the structure of your tool's response. Helps clients understand what to expect.

### Return Value

```typescript
return {
    content: [{ type: 'text', text: output.greeting }],
    structuredContent: output
};
```

- `content` - Array of content blocks (text, images, etc.) for display
- `structuredContent` - Typed object matching `outputSchema` for programmatic use

## Adding More Tools

You can register multiple tools:

```typescript
server.registerTool('greet', { ... }, async ({ name }) => { ... });
server.registerTool('farewell', { ... }, async ({ name }) => { ... });
server.registerTool('add-numbers', { ... }, async ({ a, b }) => { ... });
```

## Example: Tool with Multiple Parameters

```typescript
server.registerTool(
    'calculate',
    {
        title: 'Calculate',
        description: 'Perform basic math operations',
        inputSchema: {
            a: z.number().describe('First number'),
            b: z.number().describe('Second number'),
            operation: z.enum(['add', 'subtract', 'multiply', 'divide'])
                       .describe('Math operation to perform')
        },
        outputSchema: {
            result: z.number(),
            expression: z.string()
        }
    },
    async ({ a, b, operation }) => {
        let result: number;
        switch (operation) {
            case 'add': result = a + b; break;
            case 'subtract': result = a - b; break;
            case 'multiply': result = a * b; break;
            case 'divide': result = a / b; break;
        }
        const output = { 
            result, 
            expression: `${a} ${operation} ${b} = ${result}` 
        };
        return {
            content: [{ type: 'text', text: output.expression }],
            structuredContent: output
        };
    }
);
```

## Next Step
