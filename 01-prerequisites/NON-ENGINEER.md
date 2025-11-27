# Prerequisites (Non-Engineer Track)

## Goal

Verify that Node.js is installed on your system. If not, get guided through the installation.

## Prompt

Copy and paste this entire prompt into Cursor:

---

**I need you to check if Node.js is installed on my system and help me install it if needed.**

**Step 1: Check current installation**

Run these commands and tell me the output:
```bash
node --version
npm --version
```

**Step 2: Evaluate the results**

- If both commands show version numbers (e.g., `v20.10.0` and `10.2.0`), Node.js is installed
- If the Node.js version is v20 or later, I'm ready to proceed
- If the version is older than v20, I need to upgrade
- If the command is not found, I need to install Node.js

**Step 3: If installation or upgrade is needed**

Based on my operating system, guide me through installing Node.js v20 or later:

- **macOS**: Use the official installer from nodejs.org or Homebrew (`brew install node`)
- **Windows**: Use the official installer from nodejs.org
- **Linux**: Use nvm or the official package manager instructions

**Step 4: Verify installation**

After installation, run the version check commands again to confirm:
```bash
node --version
npm --version
```

**Success criteria:**
- `node --version` shows `v20.x.x` or later
- `npm --version` shows `v10.x.x` or later

---

## Expected Outcome

After running this prompt, Cursor will:
1. Check your Node.js installation
2. Tell you if you need to install or upgrade
3. Guide you through the installation process if needed
4. Verify the installation succeeded

## Troubleshooting

**Cursor can't run terminal commands?**
- Make sure you're in a Cursor workspace (not just a single file)
- Try opening the terminal manually (View > Terminal) and running the commands yourself

**Installation fails?**
- On macOS: Make sure Xcode Command Line Tools are installed (`xcode-select --install`)
- On Windows: Run Cursor as Administrator
- On Linux: You may need `sudo` for some commands

## Next Step

Once Node.js is installed, continue to [02-mcp-basics](../02-mcp-basics/NON-ENGINEER.md)


