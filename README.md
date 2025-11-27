# MCP Workshop

Build your first Model Context Protocol (MCP) server and connect it to Cursor.

## What is MCP?

MCP (Model Context Protocol) is a standardized protocol that allows AI assistants to communicate with external tools and services. Think of it as a universal adapter that lets AI models interact with APIs, databases, and other systems in a structured way.

## Who is this for?

This workshop has two tracks:

| Track | Description | Files to follow |
|-------|-------------|-----------------|
| **Engineers** | Hands-on coding with explanations | `ENGINEER.md` files |
| **Non-Engineers** | Copy-paste prompts for Cursor | `NON-ENGINEER.md` files |

## Workshop Structure

| Step | Topic | What you'll learn |
|------|-------|-------------------|
| [00](./00-introduction/) | Introduction | What MCP is and why it matters |
| [01](./01-prerequisites/) | Prerequisites | Installing Node.js |
| [02](./02-mcp-basics/) | MCP Basics | SDK setup and project structure |
| [03](./03-create-server/) | Create Server | Building your first MCP server |
| [04](./04-connect-to-cursor/) | Connect to Cursor | Configuring Cursor to use your server |
| [05](./05-build-real-tools/) | Build Real Tools | Airtable integration with auth |

## Quick Start

### Option 1: Use the Starter Template

```bash
cd starter-template
npm install
```

### Option 2: Look at Working Examples

Check the `examples/` folder for complete, working implementations:
- `examples/hello-world/` - Simple greeting tool
- `examples/airtable/` - Airtable integration with authentication

## Requirements

- Node.js v20 or later
- Cursor IDE
- (For Airtable example) Free Airtable account

## Resources

- [Official MCP Documentation](https://modelcontextprotocol.io)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)
