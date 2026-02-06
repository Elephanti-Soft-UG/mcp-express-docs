# MongoDB Connector for MCP Express

Integrate MCP Express with MongoDB databases to build custom tools that can seamlessly query, insert, update, delete, and manage documents in MongoDB collections. This powerful integration enables you to execute flexible database operations, retrieve document results, perform aggregations, and use the results in your MCP tools.

## Configuration

### Connection Parameters

| Parameter     | Required | Description |
|---------------|----------|-------------|
| host         | Yes     | MongoDB server hostname or IP address |
| port         | No      | MongoDB port number (defaults to 27017) |
| database     | Yes     | Database name |
| collection   | Yes     | Collection name (optional for connection test) |
| username     | No      | Username for authentication (optional) |
| password     | No      | Password for authentication (optional) |
| action       | Yes     | Operation type: `find`, `insert_one`, `insert_many`, `update_one`, `update_many`, `delete_one`, `delete_many`, `count` |
| action_config| No      | Action-specific configuration (filter_query, projection, etc.) |

## Setting Up MongoDB Integration

1. **Select MongoDB Integration**: In your MCP server dashboard, choose "MongoDB" from available integrations
2. **Configure Connection**: Enter host, port, database, collection, and authentication credentials
3. **Choose Operation**: Select the specific database operation (`action`) you want to perform
4. **Set Queries**: Define filter_query, update_query, projection, or limits in action_config
5. **Configure Templates**: Use Jinja2 templating for dynamic queries based on tool inputs
6. **Test Connection**: Use the built-in `test_conn_mongodb` to verify connectivity and list collections
7. **Save Configuration**: Store for reuse across multiple MCP tool executions

## Operating Modes

Each operation uses the same connection parameters but different action-specific fields and args:

### Find Documents
**Purpose**: Query documents with optional filter, projection, and limit

**Example Config**:
```json
{
  "action": "find",
  "host": "localhost",
  "database": "testdb",
  "collection": "users",
  "action_config": {
    "filter_query": {"status": "active"},
    "limit": 10
  }
}
```

### Insert Single Document
**Purpose**: Insert one document (args contains the document)

**Example Config**:
```json
{
  "action": "insert_one",
  "host": "localhost",
  "database": "testdb",
  "collection": "users"
}
```
**Args**: `{"name": "John Doe", "email": "john@example.com"}`

### Insert Multiple Documents
**Purpose**: Insert multiple documents (args is list of documents)

**Example Config**:
```json
{
  "action": "insert_many",
  "host": "localhost",
  "database": "testdb",
  "collection": "users"
}
```
**Args**: `[{"name": "John"}, {"name": "Jane"}]`

### Update Single Document
**Purpose**: Update first matching document

**Example Config**:
```json
{
  "action": "update_one",
  "host": "localhost",
  "database": "testdb",
  "collection": "users",
  "action_config": {
    "filter_query": {"email": "old@example.com"},
    "update_query": {"$set": {"email": "new@example.com"}}
  }
}
```

### Update Multiple Documents
**Purpose**: Update all matching documents

**Example Config**:
```json
{
  "action": "update_many",
  "host": "localhost",
  "database": "testdb",
  "collection": "users",
  "action_config": {
    "filter_query": {"status": "inactive"},
    "update_query": {"$set": {"status": "active"}}
  }
}
```

### Delete Single Document
**Purpose**: Delete first matching document

**Example Config**:
```json
{
  "action": "delete_one",
  "host": "localhost",
  "database": "testdb",
  "collection": "users",
  "action_config": {
    "filter_query": {"email": "delete@example.com"}
  }
}
```

### Delete Multiple Documents
**Purpose**: Delete all matching documents

**Example Config**:
```json
{
  "action": "delete_many",
  "host": "localhost",
  "database": "testdb",
  "collection": "users",
  "action_config": {
    "filter_query": {"status": "archived"}
  }
}
```

### Count Documents
**Purpose**: Count documents matching filter

**Example Config**:
```json
{
  "action": "count",
  "host": "localhost",
  "database": "testdb",
  "collection": "users",
  "action_config": {
    "filter_query": {"status": "active"}
  }
}
```

## Jinja2 Template Support

MongoDB integration uses templating for dynamic queries based on tool inputs:

**Template Syntax**: Variables referenced using `{{ variable_name }}`:
```json
{
  "action_config": {
    "filter_query": {"status": "{{ status }}", "user_id": "{{ user_id }}"}
  }
}
```

**Supported Template Fields**:
- `filter_query` - All query operations (find, update, delete, count)
- `update_query` - Update operations
- Document content in `args` for insert operations

**Example with Tool Inputs**:
```json
{
  "action": "find",
  "action_config": {
    "filter_query": {"department": "{{ dept }}", "year": {{ year }}}
  }
}
```
**Args**: `{"dept": "engineering", "year": 2026}`

## Example Usages

### Static Operations
**Count active users**:
```json
{
  "action": "count",
  "host": "mongodb.example.com",
  "database": "crm",
  "collection": "users",
  "action_config": {"filter_query": {"active": true}}
}
```

### Dynamic Template Operations
**User-specific query**:
```json
{
  "action": "find",
  "collection": "orders",
  "action_config": {
    "filter_query": {"user_id": "{{ user_id }}", "status": "{{ status }}"}
  }
}
```

**Templated update**:
```json
{
  "action": "update_many",
  "action_config": {
    "filter_query": {"campaign_id": "{{ campaign_id }}"},
    "update_query": {"$set": {"status": "{{ new_status }}"}}
  }
}
```

## Authentication Methods

### No Authentication (Local/Trusted)
```
# No username/password needed for local/trusted networks
```

### Username/Password Authentication
```
"username": "admin", 
"password": "securepass123"
```
URI: `mongodb://admin:securepass123@localhost:27017/`

## Security Features

### Credential Protection
- Passwords encrypted at rest
- Credentials never displayed in plain text
- Secure URI construction

### Query Validation
- Validates action_config structure
- Prevents invalid operations
- Template rendering safeguards

### Operation Safeguards
- Connection pooling and cleanup
- Limit controls prevent memory exhaustion
- Comprehensive error handling
- Detailed logging without sensitive data

## Common Use Cases

1. **Data Analytics**
   - Find/query large datasets with filters
   - Count records by criteria
   - Dynamic reporting queries

2. **CRM Operations**
   - Update customer statuses in bulk
   - Insert new leads
   - Search by custom criteria

3. **Inventory Management**
   - Find low-stock items
   - Update quantities after sales
   - Delete obsolete records

4. **User Management**
   - Query active/inactive users
   - Bulk status updates
   - Insert new registrations

## Best Practices

### Security
- Use MongoDB Atlas or replica sets for production
- Enable authentication and TLS/SSL
- Use database users with minimal required permissions
- Store credentials in vaults/secrets managers
- Validate all filter queries

### Performance
- Use indexes for frequent queries
- Set appropriate limits on find operations
- Use projection to return only needed fields
- Batch insert_many operations

### Reliability
- Always test connectivity with `test_conn_mongodb`
- Handle PyMongoError exceptions gracefully
- Implement retry logic for transient failures
- Monitor connection pool usage
- Use read preferences for replica sets