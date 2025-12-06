import { defineConfig } from 'rspress/config';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  root: 'docs',
  base: isProd ? '/mcp-workshop/' : '/',
  title: 'MCP Workshop',
  description: 'Build your first Model Context Protocol server and connect it to Cursor',
  markdown: {
    defaultWrapCode: true,
    showLineNumbers: true,
  },
  themeConfig: {
    outline: true,
    outlineTitle: 'On this page',
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/tzachbon/mcp-workshop',
      },
    ],
    sidebar: {
      '/': [
        {
          text: 'Workshop',
          items: [
            { text: 'Introduction', link: '/00-introduction/README' },
            { text: 'Prerequisites', link: '/01-prerequisites/README' },
            { text: 'MCP Basics', link: '/02-mcp-basics/README' },
            { text: 'Create Server', link: '/03-create-server/README' },
            { text: 'Connect to Cursor', link: '/04-connect-to-cursor/README' },
            { text: 'Build Real Tools', link: '/05-build-real-tools/README' },
          ],
        },
        {
          text: 'Engineer Track',
          items: [
            { text: 'Prerequisites', link: '/01-prerequisites/ENGINEER' },
            { text: 'MCP Basics', link: '/02-mcp-basics/ENGINEER' },
            { text: 'Create Server', link: '/03-create-server/ENGINEER' },
            { text: 'Connect to Cursor', link: '/04-connect-to-cursor/ENGINEER' },
            { text: 'Airtable Integration', link: '/05-build-real-tools/airtable/ENGINEER' },
          ],
        },
        {
          text: 'Non-Engineer Track',
          items: [
            { text: 'Prerequisites', link: '/01-prerequisites/NON-ENGINEER' },
            { text: 'MCP Basics', link: '/02-mcp-basics/NON-ENGINEER' },
            { text: 'Create Server', link: '/03-create-server/NON-ENGINEER' },
            { text: 'Connect to Cursor', link: '/04-connect-to-cursor/NON-ENGINEER' },
            { text: 'Airtable Integration', link: '/05-build-real-tools/airtable/NON-ENGINEER' },
          ],
        },
      ],
    },
  },
});
