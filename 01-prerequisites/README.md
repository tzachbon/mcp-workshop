# Prerequisites

Before building your MCP server, you need Node.js installed and npm authenticated to the Autodesk registry.

## Requirements

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Node.js | v20 or later | `node --version` |
| npm | v10 or later | `npm --version` |

## Choose Your Track

- **Engineers**: Follow [ENGINEER](./ENGINEER) for step-by-step installation
- **Non-Engineers**: Follow [NON-ENGINEER](./NON-ENGINEER) for a Cursor prompt that checks and guides you

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

### Step 1: Connect to VPN

Make sure you are connected to **GlobalProtect** VPN (the globe icon, not the key icon).

### Step 2: Login to JFrog in Browser

1. Navigate to [https://npm.autodesk.com/](https://npm.autodesk.com/)

2. Click the **Log in** button in the top right corner:

![JFrog Login](./imgs/jfrog-login.png)

3. Click **SAML SSO** to login with your Autodesk credentials:

![Login with SSO](./imgs/login-with-sso.png)

### Step 3: Authenticate npm in Terminal

Open a terminal in Cursor (View > Terminal):

![Open Terminal](./imgs/open-terminal.gif)

Run this command:

```bash
npm login --registry=https://npm.autodesk.com/artifactory/api/npm/autodesk-npm-virtual/ --auth-type=web
```

A URL will appear in your terminal. **Cmd+click** (or Ctrl+click) the link to open it in your browser:

![NPM Login Terminal](./imgs/npm-login.png)

Since you're already logged into JFrog from Step 2, the authentication should complete automatically.

### Step 4: Verify Authentication

```bash
npm whoami --registry=https://npm.autodesk.com/artifactory/api/npm/autodesk-npm-virtual/
```

You should see your username. If so, you're authenticated!

### Troubleshooting

**"Token Generation Prohibited" error?**
- Complete Steps 1-2 first (login to JFrog in browser), then try Step 3 again

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
