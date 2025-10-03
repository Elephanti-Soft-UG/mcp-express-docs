# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a documentation project using **Docsify** to serve static documentation for **MCP Express**.

**MCP Express** is a platform that allows users to quickly create MCP (Model Context Protocol) servers based on existing tools and APIs. It provides an intuitive interface for integrating various data sources and services, enabling users to build custom MCP servers without extensive coding. The platform supports multiple integration types including REST APIs, databases like MySQL, and other services, making it easy to connect AI models to real-world data and functionality.

## Architecture

- **Documentation Framework**: Docsify (static site generator)
- **Main Files**:
  - `docs/index.html`: Docsify configuration and entry point
  - `docs/README.md`: Main documentation content
  - `docs/.nojekyll`: Prevents Jekyll processing on GitHub Pages

## Development Workflow

Since this is a static documentation site using Docsify:

1. **Prerequisites**:
   - `nodejs` and `npm` installed on your machine.
   - `docsify-cli` installed globally using the command `npm i docsify-cli -g`

1. **Local Development**: Serve the docs directory with any static file server
   ```bash
   # Using Docsify CLI (if installed globally)
   docsify serve docs
   ```

1. **Content Editing**:
   - Edit markdown files in the `docs/` directory
   - Main content is in `docs/README.md`
   - Docsify automatically renders markdown files

1. **Deployment**:
   - Static files can be served from any web server
   - Commonly deployed to GitHub Pages, Netlify, or similar platforms

## File Structure

```
mcp-express-docs/
├── docs/                         # Documentation source files
│   ├── index.html                # Docsify configuration
│   ├── README.md                 # Main documentation content
│   ├── _sidebar.md               # Navigation sidebar configuration
│   ├── creating-tools.md         # Tool creation guide
│   ├── integrations/             # Integration documentation
│   │   ├── README.md             # Integration overview
│   │   └── integration....md     # Individual integration guides
│   ├── images/                   # Documentation images
│   └── .nojekyll                 # GitHub Pages configuration
└── .git/                         # Git repository
```

## Managing Integrations

### Adding a New Integration

When adding a new integration to the documentation:

1. **Create the integration documentation file**:
   - Use the `INTEGRATION_TEMPLATE.md` file in the root directory as a starting point
   - Copy the template and fill in all placeholders (marked with `[...]`) with integration-specific content
   - Save the file as `docs/integrations/new-integration.md`
   ```bash
   # Copy the template to create a new integration file
   cp INTEGRATION_TEMPLATE.md docs/integrations/new-integration.md
   ```

2. **Add the integration to the sidebar navigation**:
   - Edit `docs/_sidebar.md`
   - Add the new integration under the "Integrations" section:
   ```markdown
   - **Integrations**
     - [Overview](/integrations/)
     - [REST API](/integrations/rest-api)
     - [New Integration](/integrations/new-integration)
   ```

3. **Update the integrations overview**:
   - Edit `docs/integrations/README.md`
   - Add the new integration to the "Available Integrations" section

### Removing an Integration

When removing an integration from the documentation:

1. **Remove the integration documentation file**:
   ```bash
   # Delete the markdown file from docs/integrations/
   rm docs/integrations/integration-name.md
   ```

2. **Remove from the sidebar navigation**:
   - Edit `docs/_sidebar.md`
   - Remove the integration entry from the "Integrations" section

3. **Update the integrations overview**:
   - Edit `docs/integrations/README.md`
   - Remove the integration from the "Available Integrations" section

### Integration Documentation Template

Each integration should follow this structure:
- **Introduction**: Brief description of what the integration does
- **Configuration**: Required parameters and setup steps
- **Authentication**: Supported authentication methods
- **Common Use Cases**: Practical examples
- **Best Practices**: Security and performance recommendations
- **Troubleshooting**: Common issues and solutions

## Key Notes

- No build process required - Docsify renders markdown at runtime
- No package.json or dependencies to manage
- Documentation is served directly from the `docs/` directory
- The project follows the standard Docsify documentation pattern