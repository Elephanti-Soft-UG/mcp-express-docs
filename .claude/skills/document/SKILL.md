---
description: Documents the provided information following a strict guide.
---

# Write Documenation
This skill is useful when adding or updating documentation.

## Things to know
The following things are certain notes that can help guide the update or creation of documentation.
1. We are using [docusaurus](https://docusaurus.io/) to render the documentation written in Markdown.
2. The documentations are available in the docs folder.

## Documentation 
### Rendered version:
The rendered documentation structure looks like this:
Get Started/
├── Overview
├── Quick Start Guide
└── ...
Integrations/
├── <Integration Name>
│   ├── Integration
│   ├── Configuration
│   └── Security and Pattern
└── ...
Security/
├── Role-Based Access Control
└── ...
Advanced/
├── Core Concepts
├── Authorization Guide/
│   ├── OAuth Guide
│   └── Client Credentials
└── Testing your server

### Code Structure
To achieve the rendered version, the code is structured as follows:
docs/
├── get-started/
├── integrations/
│   └── <integration_name>/
├── security/
└── advanced/
    └── authorization_guide/

## Must Do
The following is our standard on how we document things. It is necessary that we maintain consistency throughout the documentation for usability purposes.
1. The root segments: get-started, integrations, security and advanced always have an auto generated index page.
2. The any subfolder that group similar ideas need a custom index, an example can be seen in [example-sub-group](./subgroup-example)
3. Integrations have a strict format as well, an example can be seen in [example-integration](./integration-example)
4. Always use full paths on links and not relative paths. eg. `/docs/advanced/static-ip-address`.
5. If you have to write contact us then, you should have a mailto link to hello@mcp-express.com
