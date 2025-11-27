# Connect to Cursor

Now that your MCP server has a tool, let's connect it to Cursor so you can use it.

## What You'll Learn

- How Cursor communicates with MCP servers
- Cursor's MCP configuration format
- Testing your tool in Cursor

## How It Works

```
┌─────────────┐    spawns     ┌─────────────┐
│   Cursor    │ ───────────►  │ Your Server │
│             │    stdin      │  (ts-node)  │
│             │ ◄──────────── │             │
│             │    stdout     │             │
└─────────────┘               └─────────────┘
```

1. Cursor spawns your server as a child process
2. Communication happens via stdin/stdout
3. No HTTP server or ports needed

## Key Requirement: Absolute Path

Cursor needs the **absolute path** to your server file. Relative paths won't work.

Example:
- **Correct**: `/Users/alice/projects/my-mcp-server/src/index.ts`
- **Wrong**: `./src/index.ts` or `~/projects/my-mcp-server/src/index.ts`

## Choose Your Track

- **Engineers**: Follow [ENGINEER.md](./ENGINEER.md) for manual configuration
- **Non-Engineers**: Follow [NON-ENGINEER.md](./NON-ENGINEER.md) for a Cursor prompt that helps you configure

## Configuration Preview

```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "npx",
      "args": ["-y", "ts-node", "--esm", "/absolute/path/to/src/index.ts"]
    }
  }
}
```

## Next Step

After connecting to Cursor, continue to [05-build-real-tools](../05-build-real-tools/) to build more useful tools.

