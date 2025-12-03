# MCP Basics

Now that Node.js is installed, let's set up an MCP server project.

## What You'll Learn

- MCP project structure
- Required dependencies
- TypeScript configuration

## Project Structure

A minimal MCP server looks like this:

```
my-mcp-server/
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── src/
    └── index.ts        # Your server code
```

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `@modelcontextprotocol/sdk` | Official MCP SDK |
| `zod` | Schema validation for tool inputs/outputs |
| `typescript` | TypeScript compiler |
| `ts-node` | Run TypeScript directly without building |

## Choose Your Track

- **Engineers**: Follow [ENGINEER.md](./ENGINEER.md) for manual setup with explanations
- **Non-Engineers**: Follow [NON-ENGINEER.md](./NON-ENGINEER.md) for a Cursor prompt that creates everything

## Quick Start

If you want to skip manual setup, use the starter template:

```bash
cd starter-template
npm install
```

## Next Step

After setting up the project, continue to [03-create-server](../03-create-server/)
