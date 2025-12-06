# Prerequisites (Engineer Track)

## Installing Node.js

### macOS

**Option 1: Official Installer**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version (v20 or later)
3. Run the installer

**Option 2: Homebrew (Recommended)**
```bash
brew install node
```

### Windows

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version (v20 or later)
3. Run the installer
4. Restart your terminal

### Linux (Ubuntu/Debian)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Linux (Using nvm - Recommended)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

## Verify Installation

```bash
node --version
# Should show v20.x.x or later

npm --version
# Should show v10.x.x or later
```

## Troubleshooting

### "node: command not found"

- **macOS/Linux**: Add Node to your PATH or restart your terminal
- **Windows**: Restart your terminal or computer

### Version is too old

If you have an older version installed:

```bash
# Using nvm (recommended)
nvm install 20
nvm use 20

# Or reinstall from nodejs.org
```

### Permission errors on npm

Don't use `sudo` with npm. Instead, fix npm permissions:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## NPM Authentication (Required for Autodesk)

Autodesk blocks anonymous npm access. You must authenticate before running `npm install`.

### Step 1: Connect to VPN

Make sure you are connected to **GlobalProtect** VPN (the globe icon, not the key icon).

### Step 2: Login to JFrog in Browser

1. Navigate to [https://npm.autodesk.com/](https://npm.autodesk.com/)

2. Click the **Log in** button in the top right corner:

![JFrog Login](./imgs/jfrog-login.png)

3. Click **SAML SSO** to login with your Autodesk credentials:

![Login with SSO](./imgs/login-with-sso.png)

### Step 3: Authenticate npm in Terminal

Run this command:

```bash
npm login --registry=https://npm.autodesk.com/artifactory/api/npm/autodesk-npm-virtual/ --auth-type=web
```

A URL will appear in your terminal. **Cmd+click** (or Ctrl+click) the link to open it in your browser:

![NPM Login Terminal](./imgs/npm-login.png)

Since you're already logged into JFrog from Step 2, the authentication should complete automatically.

### Step 4: Verify

```bash
npm whoami --registry=https://npm.autodesk.com/artifactory/api/npm/autodesk-npm-virtual/
```

You should see your Autodesk username.

### Troubleshooting npm auth

**Error: `Token Generation Prohibited`**

Complete Steps 1-2 first (login to JFrog in browser), then try Step 3 again.

**Error: `Invalid auth configuration found`**
```bash
npm config fix
```

**Error: `401 Unauthorized` or `403 Forbidden`**

Your authentication may have expired. Re-run the login command:
```bash
npm login --registry=https://npm.autodesk.com/artifactory/api/npm/autodesk-npm-virtual/ --auth-type=web
```

**Check your existing auth:**
```bash
cat ~/.npmrc
```

You should see entries with `_authToken` for `npm.autodesk.com`.

**Still stuck?**

Ask in [#tech-artifactory-build](https://autodesk.enterprise.slack.com/archives/C0YDHLUCX) on Slack.

---
