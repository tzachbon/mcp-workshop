# Airtable MCP Server (Engineer Track)

## Goal

Build an MCP server that connects to Airtable by having Cursor generate the implementation from the official API documentation.

## Prerequisites

- Airtable account with a base containing data
- Personal Access Token from [airtable.com/create/tokens](https://airtable.com/create/tokens)
  - Scopes: `data.records:read`, `data.records:write`
  - Access: Your target base

## Prompt

Use this prompt to have Cursor generate the MCP server from the API docs:

```
Generate an Airtable MCP server from the official API documentation.

Read these Airtable API docs:
- List records: https://airtable.com/developers/web/api/list-records
- Get record: https://airtable.com/developers/web/api/get-record
- Create records: https://airtable.com/developers/web/api/create-records

Reference @starter-template/src/index.ts for MCP SDK patterns.

Requirements:
1. Generate a tool for each endpoint based on the API docs
2. Derive zod schemas from the documented request/response shapes
3. Environment variables: AIRTABLE_PAT, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME
4. Fail fast on missing credentials at startup
5. Return structured output with both content and structuredContent

Project location: airtable-mcp/

After generating, update ~/.cursor/mcp.json with the server config.
```

## What to Verify

When Cursor generates the code, check:

### Environment Variable Handling
Credentials from env vars, fail-fast validation at startup.

### Schema Derivation
Cursor should infer schemas from the API docs:
- Query params like `maxRecords`, `view`, `filterByFormula`
- Request body structure for create operations
- Response shapes with `id`, `fields`, `createdTime`

### Dynamic Field Handling
Airtable tables have user-defined fields, so expect:
```typescript
fields: z.record(z.any())
```

### Auth Header
Bearer token from the PAT.

## Cursor Configuration

The generated config should look like:

```json
{
  "mcpServers": {
    "airtable": {
      "command": "npx",
      "args": [
        "--registry", "https://npm.autodesk.com/artifactory/api/npm/autodesk-npm-virtual",
        "-y", "ts-node", "--esm", "/path/to/airtable-mcp/src/index.ts"
      ],
      "env": {
        "AIRTABLE_PAT": "pat_your_token",
        "AIRTABLE_BASE_ID": "appYourBaseId",
        "AIRTABLE_TABLE_NAME": "tblYourTableId"
      }
    }
  }
}
```

**Finding your IDs from the URL:**
`https://airtable.com/app{baseId}/tbl{tableId}/viw{viewId}`

## Test It

After reloading Cursor:
- "List all records from my Airtable"
- "Create a new task called 'Learn MCP'"
- "Get the record with ID recXXXXXX"

## Extending the Server

To add more endpoints, just point Cursor at more docs:

```
Add an update-record tool to my Airtable MCP server.

Use this API endpoint: https://airtable.com/developers/web/api/update-record

Add to airtable-mcp/src/index.ts following the existing patterns.
```

Other endpoints to try:
- Delete record: https://airtable.com/developers/web/api/delete-record
- Update multiple records: https://airtable.com/developers/web/api/update-multiple-records
- List bases: https://airtable.com/developers/web/api/list-bases

## Key Concepts

| Concept | What's Happening |
|---------|------------------|
| Doc-to-code generation | Cursor reads API docs and generates implementation |
| Schema inference | Zod schemas derived from documented shapes |
| Environment config | Credentials via MCP config `env` block |
| Extensibility | Add tools by pointing at more doc URLs |
