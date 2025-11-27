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

## Next Step

Continue to [02-mcp-basics](../02-mcp-basics/ENGINEER.md)



