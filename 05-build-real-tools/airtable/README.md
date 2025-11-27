# Airtable MCP Server

Build an MCP server that interacts with Airtable, including authentication.

## What You'll Build

Three tools:
1. **list-records** - List all records from a table
2. **get-record** - Get a single record by ID
3. **create-record** - Create a new record

## Prerequisites

1. **Free Airtable account** - Sign up at [airtable.com](https://airtable.com)
2. **A base with at least one table** - Can be anything (tasks, contacts, inventory)
3. **Personal Access Token (PAT)** - We'll create this below

## Step 1: Create Personal Access Token

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click **"Create new token"**
3. Name it something like "MCP Workshop"
4. Add scopes:
   - `data.records:read`
   - `data.records:write`
5. Add your base under "Access"
6. Click **"Create token"**
7. **Copy the token** (starts with `pat_...`) - you won't see it again!

More details: [Airtable PAT Documentation](https://support.airtable.com/docs/creating-personal-access-tokens)

## Step 2: Find Your Base ID

1. Open your Airtable base in the browser
2. Look at the URL: `https://airtable.com/appXXXXXXXXXXXXX/...`
3. The base ID is the part starting with `app` (e.g., `appXXXXXXXXXXXXX`)

## Choose Your Track

- **Engineers**: Follow [ENGINEER.md](./ENGINEER.md) for step-by-step implementation
- **Non-Engineers**: Follow [NON-ENGINEER.md](./NON-ENGINEER.md) for a ready-to-use prompt

## Security Note

**Never commit your API token to git!**

We'll use environment variables to keep your token secure:
- Store in Cursor MCP config (not in code)
- Or use a local `.env` file (add to `.gitignore`)

## Working Example

See `examples/airtable/` in the workshop root for a complete working implementation.

