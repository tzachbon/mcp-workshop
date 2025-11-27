# Introduction to MCP

## What is MCP?

**MCP (Model Context Protocol)** is an open standard that defines how AI assistants communicate with external tools and data sources. It acts as a bridge between AI models (like Claude, GPT) and the real world.

Think of it like this:
- **Without MCP**: AI can only respond based on its training data
- **With MCP**: AI can fetch live data, call APIs, read files, query databases

## How MCP Works

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Cursor    │ ◄─────► │ MCP Server  │ ◄─────► │  External   │
│  (Client)   │   MCP   │ (Your Code) │  HTTP   │    APIs     │
└─────────────┘         └─────────────┘         └─────────────┘
```

1. **Client** (Cursor, Claude Desktop): The AI assistant that wants to use tools
2. **Server** (Your code): Exposes tools the AI can call
3. **Transport**: How they communicate (stdio for local servers)

## Key Concepts

### Tools
Functions the AI can call. Each tool has:
- A **name** (e.g., `get-pokemon`)
- A **description** (what it does)
- **Input schema** (what parameters it accepts)
- **Output schema** (what it returns)

### Resources
Static or dynamic data the AI can read (like files or database records).

### Prompts
Pre-defined templates for common interactions.

## Why MCP Matters

| Before MCP | With MCP |
|------------|----------|
| Every AI tool integration was custom | Standardized protocol everyone can use |
| Vendors locked in their integrations | Open ecosystem of tools |
| Hard to extend AI capabilities | Easy to add new tools |

## What You'll Build

In this workshop, you'll create MCP servers that:

1. **Hello World** - A simple greeting tool (learn the basics)
2. **Airtable** - Interact with Airtable (with authentication)

By the end, you'll understand how to turn any API into an MCP tool that Cursor can use.

## Next Step

Continue to [01-prerequisites](../01-prerequisites/) to set up your environment.
