# Connect to Cursor (Engineer Track)

## Step 1: Get Your Absolute Path

Find the absolute path to your `src/index.ts` file:

**macOS/Linux:**
```bash
cd my-mcp-server
pwd
# Example output: /Users/alice/projects/my-mcp-server
```

Your full path is: `/Users/alice/projects/my-mcp-server/src/index.ts`

**Windows:**
```cmd
cd my-mcp-server
cd
# Example output: C:\Users\alice\projects\my-mcp-server
```

Your full path is: `C:\Users\alice\projects\my-mcp-server\src\index.ts`

## Step 2: Open Cursor Settings

1. Open Cursor
2. Go to **Cursor Settings** (not VS Code settings)
   - macOS: `Cmd + Shift + J` → Click gear icon → Cursor Settings
   - Windows/Linux: `Ctrl + Shift + J` → Click gear icon → Cursor Settings
3. Navigate to **Features** → **MCP Servers**

## Step 3: Add Your Server

Click **"Add new MCP server"** or edit the JSON configuration directly.

Add this configuration (replace the path with your actual path):

```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "npx",
      "args": ["-y", "ts-node", "--esm", "/Users/alice/projects/my-mcp-server/src/index.ts"]
    }
  }
}
```

### Configuration explained:

| Field | Value | Purpose |
|-------|-------|---------|
| `"my-mcp-server"` | Server name | Identifier shown in Cursor |
| `"command"` | `"npx"` | Uses npx to run ts-node |
| `"args"` | Array | Arguments passed to the command |
| `"-y"` | | Auto-confirm npx prompts |
| `"ts-node"` | | TypeScript runner |
| `"--esm"` | | Enable ES modules |
| Last arg | | Absolute path to your server |

## Step 4: Verify Connection

1. Restart Cursor (or reload the window)
2. Open the MCP panel (usually in sidebar or via Command Palette)
3. You should see your server listed
4. Check that the `greet` tool appears

## Step 5: Test Your Tool

In Cursor's chat, ask:

> "Use the greet tool to say hello to Alice"

Cursor should call your `greet` tool and return:

> "Hello, Alice! Welcome to MCP."

## Troubleshooting

### Server not appearing

- Check the absolute path is correct
- Make sure `npm install` was run in your project
- Try running manually: `npx -y ts-node --esm /your/path/src/index.ts`

### "Module not found" errors

- Verify `package.json` has `"type": "module"`
- Check that all imports use `.js` extensions (required for ES modules)

### Server starts but tools don't appear

- Check your tool registration has no syntax errors
- Look at Cursor's MCP logs for error messages

### Windows path issues

Use forward slashes or escaped backslashes:
```json
"args": ["-y", "ts-node", "--esm", "C:/Users/alice/projects/my-mcp-server/src/index.ts"]
```
or
```json
"args": ["-y", "ts-node", "--esm", "C:\\Users\\alice\\projects\\my-mcp-server\\src\\index.ts"]
```

## Example Configuration File

See [cursor-config-example.json](./cursor-config-example.json) for a complete example.

## Next Step

Continue to [05-build-real-tools](../05-build-real-tools/ENGINEER.md) to build more useful tools.

