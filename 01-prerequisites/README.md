# Prerequisites

Before building your MCP server, you need Node.js installed and npm authenticated to the Autodesk registry.

## Requirements

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Node.js | v20 or later | `node --version` |
| npm | v10 or later | `npm --version` |

## Choose Your Track

- **Engineers**: Follow [ENGINEER.md](./ENGINEER.md) for step-by-step installation
- **Non-Engineers**: Follow [NON-ENGINEER.md](./NON-ENGINEER.md) for a Cursor prompt that checks and guides you

## Quick Check

Run this in your terminal:

```bash
node --version
npm --version
```

If both show version numbers, you're ready for Node.js.

---

## ⚠️ NPM Authentication (Required)

Autodesk requires authentication to install npm packages. If `npm install` fails with **401/403 errors**, you need to authenticate.

### Quick Fix

Run this command and follow the browser login:

```bash
npm login --registry=https://npm.autodesk.com/artifactory/api/npm/autodesk-npm-virtual/ --auth-type=web
```

A browser window will open for SSO authentication. Complete the login, then return to your terminal.

### Verify Authentication

```bash
npm whoami --registry=https://npm.autodesk.com/artifactory/api/npm/autodesk-npm-virtual/
```

You should see your username. If so, you're authenticated!

### Troubleshooting

**Still getting errors?**

1. Try fixing your npm config:
   ```bash
   npm config fix
   ```

2. If you have an old `.npmrc` in your home directory, you may need to update it:
   ```bash
   cat ~/.npmrc
   ```
   
3. For more help, visit [#tech-artifactory-build](https://autodesk.enterprise.slack.com/archives/C0YDHLUCX) on Slack or see the [NPM Registry Authentication Guide](https://autodesk.atlassian.net/wiki/spaces/AACE/pages/606539205).

---

Once Node.js is installed and npm is authenticated, continue to [02-mcp-basics](../02-mcp-basics/).
