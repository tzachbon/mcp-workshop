# Airtable MCP Server (Non-Engineer Track)

## Goal

Create an MCP server that can read and write to your Airtable base by having Cursor generate the code from the official API documentation.

## Before You Start

You need:
1. **Airtable account** - Free at [airtable.com](https://airtable.com)
2. **A base with data** - Any table works (tasks, contacts, etc.)
3. **Personal Access Token** - See instructions below

## Get Your Airtable Credentials

### Step 1: Create Personal Access Token

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click **"Create new token"**
3. Name: "MCP Workshop"
4. Scopes: Add `data.records:read` and `data.records:write`
5. Access: Select your base
6. Click **Create token**
7. **Copy the token** (starts with `pat_`) - save it somewhere safe!

### Step 2: Get Your Base ID and Table ID

1. Open your base in Airtable
2. Look at the URL: `https://airtable.com/appXXXXXXXXXXXXX/tblYYYYYYYYYYYYYYY/viwZZZZZZZZZZZZZZZ`
3. **Base ID**: The part starting with `app` (e.g., `appThsjff4YKo6BSm`)
4. **Table ID**: The part starting with `tbl` (e.g., `tblOhmJW6zEVwGWiW`)

## Prompt

Copy and paste this prompt into Cursor:

```text
Create an Airtable MCP server by reading the official API documentation.

Use the Airtable Web API docs to understand the API:
- List records: https://airtable.com/developers/web/api/list-records
- Get record: https://airtable.com/developers/web/api/get-record
- Create records: https://airtable.com/developers/web/api/create-records

Generate an MCP server with tools for these three operations.

Reference @starter-template/src/index.ts for the MCP SDK patterns.

Project setup:
- Create in a new folder called airtable-mcp in my current workspace
- Environment variables for credentials: AIRTABLE_PAT, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME
- Use zod for input/output schemas based on what you learn from the API docs
- Handle errors gracefully

After creating the server:
1. Run npm install
2. Get my absolute path with pwd
3. Update my Cursor MCP config at ~/.cursor/mcp.json with the server entry and placeholder credentials

I will provide my Airtable credentials:
- AIRTABLE_PAT (Personal Access Token starting with pat_)
- AIRTABLE_BASE_ID (starts with app)
- AIRTABLE_TABLE_NAME (table ID starting with tbl or the table name)
```

## What Happens

Cursor will:
1. **Read the official Airtable API docs** to understand the endpoints
2. **Generate the MCP server code** based on what it learns
3. Create the project structure and install dependencies
4. Update your Cursor config with the server

This demonstrates the real power of AI coding: you point it at documentation, it generates working code.

## After the Prompt

1. Provide your Airtable credentials when asked
2. Restart Cursor (Cmd+Shift+P → "Reload Window")
3. Test by typing: "List my Airtable records"

## Config File Location

| OS | Path |
|----|------|
| macOS | `/Users/{username}/.cursor/mcp.json` |
| Windows | `C:\Users\{username}\.cursor\mcp.json` |
| Linux | `/home/{username}/.cursor/mcp.json` |

## Troubleshooting

**"Missing environment variables" error?**
- Make sure the `env` section is in your Cursor config
- Double-check your PAT and Base ID

**"INVALID_PERMISSIONS" error?**
- Your PAT needs `data.records:read` and `data.records:write` scopes
- Make sure you added your base to the token's access list

**"TABLE_NOT_FOUND" error?**
- Check the exact table name (case-sensitive) or use the table ID instead
- Table ID starts with `tbl` and can be found in the URL
- Update `AIRTABLE_TABLE_NAME` in your Cursor config

## What's Next?

Want more Airtable capabilities? Just point Cursor at more API docs:

```text
Add a new tool to my Airtable MCP server.

Use this API endpoint: https://airtable.com/developers/web/api/update-record

Add it to my existing airtable-mcp/src/index.ts following the same patterns.
```

Cursor reads the docs and generates the tool. That's it.
