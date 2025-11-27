# MCP Basics (Engineer Track)

## Create Project Directory

```bash
mkdir my-mcp-server
cd my-mcp-server
```

## Initialize npm Project

```bash
npm init -y
```

## Install Dependencies

```bash
npm install @modelcontextprotocol/sdk zod
npm install -D typescript ts-node @types/node
```

## Configure package.json

Update your `package.json` to use ES modules and add a start script:

```json
{
  "name": "my-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "main": "src/index.ts",
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

## Create tsconfig.json

Create a `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Key settings explained:

- `"type": "module"` in package.json - Use ES modules (required for MCP SDK)
- `"module": "NodeNext"` - Modern Node.js module resolution
- `"esModuleInterop": true` - Better compatibility with CommonJS modules
- `"strict": true` - Catch more TypeScript errors

## Create Source Directory

```bash
mkdir src
```

## Create Minimal Server

Create `src/index.ts`:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
    name: 'my-mcp-server',
    version: '1.0.0'
});

// Tools will be registered here

const transport = new StdioServerTransport();
await server.connect(transport);
```

## Understanding the Code

```typescript
// Import the main server class
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

// Import stdio transport (used by Cursor to communicate with your server)
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Create server with name and version (shown to clients)
const server = new McpServer({
    name: 'my-mcp-server',
    version: '1.0.0'
});

// Stdio transport reads from stdin and writes to stdout
// This is how Cursor will communicate with your server
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Verify Setup

Your project structure should now be:

```
my-mcp-server/
├── node_modules/
├── package.json
├── package-lock.json
├── tsconfig.json
└── src/
    └── index.ts
```

## Next Step

Continue to [03-create-server](../03-create-server/ENGINEER.md) to add tools to your server.

