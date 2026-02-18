# Quick Start Guide

Get your first MCP server up and running in 5 minutes!

## Prerequisites

- **MCP Express Account** – [Sign up free](https://app.mcp-express.com/signup) (no credit card required)
- [**Claude Desktop**](https://code.claude.com/docs/en/desktop) – installed and ready
- [**Node.js**](https://nodejs.org/en/download) – check with `node --version`
- **PostgreSQL database** – have your connection details handy

**Time required:** 5 minutes


> **MCP (Model Context Protocol)** is an open standard that lets AI models like Claude connect to external data sources, tools, and services.  
> [Learn More: Model Context Protocol](https://modelcontextprotocol.io)

---

## Connect to PostgreSQL

1. **Create a server** with a title and description.  
   *(Helps you identify what the server is for.)*

   ![Create MCP Server](./images/create-mcp-server-quick-start-guide.webp)

2. Inside your server, click **Add Tool**.

   ![Add New Tool](./images/tools-configuration-for-quick-start-guide.webp)

3. Select **PostgreSQL** from the tools list.

   ![Choose PostgreSQL Tool](./images/choose-postgres-tool-quick-start-guide.webp)

4. Through **Quick Connect**, paste your PostgreSQL connection string.  
   *(Inserts all necessary values automatically.)*

   ![Quick Connect PostgreSQL](./images/quick-connect-postgres-quick-start-guide.webp)

5. **Insert the queries** you want your AI agent to execute.

   ![Add Queries for AI](./images/add-queries-for-ai-to-run-quick-start-guide.webp)

6. **Give your tool a descriptive title and name.**  
   *(Claude uses this information to determine when to invoke the tool during interactions.)*


> For more details, see the [PostgreSQL documentation](https://docs.mcp-express.com/#/integrations/postgresql) (link to your full docs).

---

## Connect Your AI Agent

1. **Create a new client.**

2. Start talking with your PostgreSQL using natural language.

   ![Claude Answering Queries](./images/claude_answering_user_queries_quick-start-guide.gif)  
   See detailed articles on how to work with your AI Agent:

   - [Connect Claude with your MCP Server (Detailed Article)](https://www.mcp-express.com/blogs/create-and-connect-mcp-server-with-claude-under-5-minutes/)

**Congratulations!** You can now directly talk with your database.  
Try asking:  
- `"What tables are in my database?"` – to list your actual tables  
- `"What is the …?"` – to explore your data  


> Your AI Agent has restricted access to only the parts you configured.  
> The example questions above may result in access errors if those operations aren’t permitted.  
<!-- > Refer to our documentation on [how to control your access](#). -->

---

## Next Steps

- **Add more queries to your server** – set up the operations Claude will use most, like fetching orders, searching records, or updating data.
- **Connect more integrations** – add Slack, Confluence, or other services.
- **Invite your team** – add colleagues as clients so they can use the same server with their own Claude.

---

## Need Help?

### Troubleshooting your Tools

1. Go to **Test Tools**.
2. Select your server: `my-postgres-server`
3. Choose tool: `get_users_by_id`
4. Run your tool to find issues

### Other Resources

- 📖 [Full PostgreSQL Documentation](https://docs.mcp-express.com/#/integrations/postgresql)
- 📧 [Talk With Us](mailto:service@elephanti-soft.de)