# Connect to Cursor (Non-Engineer Track)

## Goal

Configure Cursor to use your MCP server so you can test the greet tool.

## Prompt

Copy and paste this entire prompt into Cursor:

---

**Help me configure Cursor to use my MCP server.**

**Step 1: Find my server's absolute path**

Run this command to find the absolute path to my MCP server:
```bash
cd my-mcp-server && pwd
```

Tell me the full absolute path to the `src/index.ts` file.

**Step 2: Create the Cursor MCP configuration**

The configuration should look like this (with my actual path):

```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "npx",
      "args": ["-y", "ts-node", "--esm", "/ABSOLUTE/PATH/TO/my-mcp-server/src/index.ts"]
    }
  }
}
```

**Step 3: Guide me to add this to Cursor**

Tell me exactly how to:
1. Open Cursor Settings (the Cursor-specific settings, not VS Code settings)
2. Navigate to Features → MCP Servers
3. Add my server configuration with the correct absolute path

**Step 4: Verify it works**

After I add the configuration:
1. Tell me to restart Cursor
2. Tell me how to check if the server connected successfully
3. Tell me to test by asking you to "use the greet tool to say hello to my name"

**Important:**
- The path MUST be absolute (starting with `/` on Mac/Linux or `C:\` on Windows)
- Relative paths like `./src/index.ts` will NOT work
- The path must point to the actual `src/index.ts` file

---

## Expected Outcome

After running this prompt, Cursor will:
1. Find your server's absolute path
2. Show you the exact configuration to add
3. Guide you through Cursor's settings
4. Help you verify the connection works

## Manual Steps (if prompt doesn't work)

If Cursor can't help with settings directly:

### 1. Find your path

In terminal:
```bash
cd my-mcp-server
pwd
```

Add `/src/index.ts` to the output. For example:
`/Users/yourname/projects/my-mcp-server/src/index.ts`

### 2. Open Cursor Settings

- Press `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux)
- Look for "Cursor Settings" (not "Settings")
- Or: Click the gear icon → select "Cursor Settings"

### 3. Find MCP Servers

- Go to Features section
- Click on MCP Servers

### 4. Add your server

Add this configuration (replace the path with yours):

```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "npx",
      "args": ["-y", "ts-node", "--esm", "/YOUR/ACTUAL/PATH/my-mcp-server/src/index.ts"]
    }
  }
}
```

### 5. Restart and test

1. Restart Cursor
2. In chat, type: "Use the greet tool to say hello to Alice"
3. You should see: "Hello, Alice! Welcome to MCP."

## Troubleshooting

**Can't find Cursor Settings?**
- It's different from VS Code Settings
- Look for "Cursor" in the settings menu, not "Settings (JSON)"

**Server not connecting?**
- Double-check the absolute path
- Make sure there are no typos
- Try restarting Cursor

**Tool not working?**
- Check that npm install was completed
- Look for error messages in the MCP panel

## Next Step

Once your greet tool works, continue to [05-build-real-tools](../05-build-real-tools/NON-ENGINEER.md) to build more useful tools!

