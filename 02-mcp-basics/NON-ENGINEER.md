# MCP Basics (Non-Engineer Track)

## Goal

Create a new MCP server project with all the necessary configuration.

## Prompt

Copy and paste this entire prompt into Cursor:

~~~text
Create a new MCP (Model Context Protocol) server project for me.

Project location: Create in a new folder called `my-mcp-server` in my current workspace.

Required structure:
```
my-mcp-server/
├── .npmrc
├── .gitignore
├── package.json
├── tsconfig.json
└── src/
    └── index.ts
```

.npmrc must contain:
```
registry=https://npm.autodesk.com/artifactory/api/npm/autodesk-npm-virtual
```

.gitignore must contain:
```
node_modules/
dist/
.env
*.log
```

package.json must contain:
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

tsconfig.json must contain:
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

src/index.ts must contain:
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

After creating the files, run:
```bash
cd my-mcp-server
npm install
```

Success criteria:
- All five files are created (.npmrc, .gitignore, package.json, tsconfig.json, src/index.ts)
- npm install completes without errors
- The node_modules folder is created
~~~

## Expected Outcome

After running this prompt, Cursor will:
1. Create the `my-mcp-server` folder
2. Create all configuration files with the correct content
3. Run `npm install` to download dependencies

## Troubleshooting

**npm install fails with network error?**
- Check your internet connection
- Try running `npm install` again manually

**Permission denied errors?**
- Make sure you have write access to the current folder
- Try creating the project in a different location

**TypeScript errors showing in the editor?**
- This is normal before `npm install` completes
- The errors should disappear after dependencies are installed

## What These Files Do

| File | Purpose |
|------|---------|
| `.npmrc` | Points npm to the Autodesk registry |
| `.gitignore` | Excludes node_modules and secrets from git |
| `package.json` | Lists dependencies and scripts |
| `tsconfig.json` | Configures TypeScript |
| `src/index.ts` | Your server code (currently empty) |
