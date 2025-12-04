# Connect to Cursor (Non-Engineer Track)

## Goal

Configure Cursor to use your MCP server so you can test the greet tool.

## Prompt

Copy and paste this entire prompt into Cursor:

~~~
I need you to configure Cursor to use my MCP server. Do this automatically by editing the config file.

Step 1: Find my server's absolute path

Run this command:
```bash
cd my-mcp-server && pwd
```

Save the output - this is my project path. The full path to my server file is: {project_path}/src/index.ts

Step 2: Find and read the Cursor MCP config

First, find my home directory and the config file path:
```bash
echo "$HOME/.cursor/mcp.json"
```

The config file is at that path (e.g., /Users/myusername/.cursor/mcp.json).

Read this file. If it doesn't exist or the .cursor folder doesn't exist, create them:
```bash
mkdir -p "$HOME/.cursor"
```

Step 3: Update the config file

Add my server to the mcpServers object. The entry should look like this:

```json
"my-mcp-server": {
  "command": "npx",
  "args": [
    "--registry", "https://npm.autodesk.com/artifactory/api/npm/autodesk-npm-virtual",
    "-y", "ts-node", "--esm", "/ABSOLUTE/PATH/TO/my-mcp-server/src/index.ts"
  ]
}
```

Important rules:
- Replace /ABSOLUTE/PATH/TO/ with the actual path from Step 1
- Keep any existing servers in the config - don't delete them
- Make sure the JSON is valid after editing

Step 4: Write the updated config

Save the updated config back to the mcp.json file.

Step 5: Tell me what to do next

After updating the file:
1. Tell me to restart Cursor (Cmd+Shift+P → "Reload Window" or quit and reopen)
2. Tell me to test by typing: "Use the greet tool to say hello to Alice"

Success criteria:
- The mcp.json file is updated with my server entry
- The path in the config is absolute (starts with / on Mac or C:\ on Windows)
- Existing MCP servers in the config are preserved
~~~

## Expected Outcome

After running this prompt, Cursor will:
1. Find your server's absolute path
2. Read your existing Cursor MCP config
3. Add your server to the config (keeping other servers)
4. Save the updated config
5. Tell you to restart and test

## Config File Location

Run this to find your exact path:
```bash
echo "$HOME/.cursor/mcp.json"
```

| OS | Path |
|----|------|
| macOS | `/Users/{username}/.cursor/mcp.json` |
| Windows | `C:\Users\{username}\.cursor\mcp.json` |
| Linux | `/home/{username}/.cursor/mcp.json` |

## What The Config Looks Like

After the update, your `~/.cursor/mcp.json` should look something like:

```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "npx",
      "args": [
        "--registry", "https://npm.autodesk.com/artifactory/api/npm/autodesk-npm-virtual",
        "-y", "ts-node", "--esm", "/Users/yourname/projects/my-mcp-server/src/index.ts"
      ]
    }
  }
}
```

If you had other servers already, they'll still be there:

```json
{
  "mcpServers": {
    "some-other-server": { ... },
    "my-mcp-server": {
      "command": "npx",
      "args": [
        "--registry", "https://npm.autodesk.com/artifactory/api/npm/autodesk-npm-virtual",
        "-y", "ts-node", "--esm", "/Users/yourname/projects/my-mcp-server/src/index.ts"
      ]
    }
  }
}
```

## Troubleshooting

**"File not found" error?**
- The mcp.json file might not exist yet
- Ask Cursor to create it with just your server config

**Server not appearing after restart?**
- Check that the mcp.json file was actually saved
- Run `cat "$HOME/.cursor/mcp.json"` to verify the content
- Make sure the JSON is valid (no trailing commas, proper brackets)

**"Permission denied" error?**
- The file might be owned by a different user
- Try: `chmod 644 "$HOME/.cursor/mcp.json"`

**Tool not working after restart?**
- Check the absolute path is correct
- Make sure `npm install` was completed in your project
- Look for error indicators next to your server in Cursor's MCP panel

## Next Step

Once your greet tool works, continue to [05-build-real-tools](../05-build-real-tools/NON-ENGINEER.md) to build more useful tools!
