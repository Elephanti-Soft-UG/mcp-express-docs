# SFTP Connector for MCP Express

Integrate MCP Express with SFTP servers to build custom tools that can seamlessly query, transfer, and manage files on remote secure file servers. This powerful integration enables you to execute flexible file operations against SFTP servers, retrieve file listings and contents, and use the results in your MCP tools.

## Configuration

### Connection Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| hostname | Yes | SFTP server hostname or IP address (supports `host` field) |
| port | No | SFTP port number (defaults to 22) |
| username | Yes | Username for SFTP authentication |
| password | Conditional | Password for authentication (required if no private_key) |
| private_key | Conditional | Path to private key file (required if no password) |
| action | Yes | Operation type: `list`, `search`, `read`, `write`, `upload`, `download` |

## Setting Up SFTP Integration

1. **Select SFTP Integration**: In your MCP server dashboard, choose "SFTP" from available integrations
2. **Configure Connection**: Enter hostname, port, username, and authentication method (password or private key)
3. **Choose Operation**: Select the specific file operation (`action`) you want to perform
4. **Set Paths**: Define remote paths, local paths, patterns, or content based on your operation
5. **Configure Options**: Set recursive search, overwrite behavior, encoding, and limits
6. **Test Connection**: Use the built-in `test_conn_sftp` to verify connectivity
7. **Save Configuration**: Store for reuse across multiple MCP tool executions

## Operating Modes

Each operation uses the same connection parameters but different action-specific fields:

### List Files & Directories
**Purpose**: Inventory files and directories with metadata (size, permissions, timestamps)

**Example Config**:
```json
{
  "action": "list",
  "hostname": "sftp.example.com",
  "remote_path": "/data",
  "recursive": false
}
```

### Search Files by Pattern
**Purpose**: Find files matching patterns like `*.log` or `*.pdf` recursively

**Example Config**:
```json
{
  "action": "search", 
  "hostname": "sftp.example.com",
  "remote_path": "/logs",
  "pattern": "*.error.log"
}
```

### Read File Contents
**Purpose**: Retrieve file content (text or binary as base64)

**Example Config**:
```json
{
  "action": "read",
  "hostname": "sftp.example.com",
  "remote_file_path": "/config/app.json"
}
```

### Write/Create Files
**Purpose**: Create new files or update existing ones with content

**Example Config**:
```json
{
  "action": "write",
  "hostname": "sftp.example.com",
  "remote_file_path": "/output/report.json",
  "file_content": "{\"status\": \"success\"}"
}
```

### Upload Files
**Purpose**: Transfer local files to remote SFTP server

**Example Config**:
```json
{
  "action": "upload",
  "hostname": "sftp.example.com",
  "local_file_path": "/tmp/data.csv",
  "remote_file_path": "/incoming/data.csv"
}
```

### Download Files
**Purpose**: Transfer remote files to local system

**Example Config**:
```json
{
  "action": "download", 
  "hostname": "sftp.example.com",
  "remote_file_path": "/backups/daily.tar.gz",
  "local_file_path": "/tmp/backup.tar.gz"
}
```

## Jinja2 Template Support

The SFTP integration uses templating to create dynamic file operations based on tool inputs. Multiple fields support templating:

**Template Syntax**: Variables from tool inputs referenced using `{{ variable_name }}`:
```json
{
  "remote_path": "/logs/{{ date }}/{{ service }}",
  "pattern": "{{ file_pattern }}.log"
}
```

**Supported Template Fields** (by operation):
- `remote_path`, `remote_file_path` - All operations
- `pattern` - Search operation  
- `file_content` - Write operation
- `local_file_path`, `remote_file_path` - Upload/Download operations

**Example with Tool Inputs**:
```json
{
  "action": "search",
  "remote_path": "/logs/{{year}}/{{month}}",
  "pattern": "{{service_name}}*.log"
}
```
**Tool args**: `{"year": "2026", "month": "01", "service_name": "api"}`

## Example Usages

### Static Operations (No Input Parameters Required)
Fixed operations for consistent file management:

**List production uploads**:
```json
{
  "action": "list",
  "hostname": "prod-sftp.example.com", 
  "remote_path": "/uploads"
}
```

**Daily backup verification**:
```json
{
  "action": "search",
  "remote_path": "/backups",
  "pattern": "backup-{{ today }}.tar.gz"
}
```

### Dynamic Template Operations
Parameterized operations accepting tool inputs:

**Service-specific log search**:
```json
{
  "action": "search",
  "remote_path": "/logs",
  "pattern": "{{ service }}*.log",
  "recursive": true
}
```

**Dynamic file processing**:
```json
{
  "action": "read", 
  "remote_file_path": "/data/{{ order_id }}.json"
}
```

## Authentication Methods

### Password Authentication
```
"username": "user", 
"password": "securepass123"
```

### Key-Based Authentication (Recommended)
```
"username": "user",
"private_key": "/path/to/id_rsa"
```
**Security Note**: Private key files should have `chmod 600` permissions.

## Security Features

### Credential Protection
- Passwords and private keys encrypted at rest
- Credentials never displayed in plain text after configuration
- Secure transmission and storage protocols

### File Path Validation
- Prevents directory traversal attacks (`../`)
- Validates paths exist before operations
- Permission checks before file modifications

### Operation Safeguards
- Overwrite protection (configurable)
- Recursion depth limits (max 10 levels)
- Result limits prevent resource exhaustion
- Comprehensive logging without sensitive data

## Common Use Cases

1. **Log File Management**
   - Search for error logs by pattern
   - Download logs for analysis  
   - Archive old log files automatically

2. **Data Synchronization**
   - Upload processed CSV files to partner SFTP
   - Download incoming EDI files for processing
   - Verify file transfers with size checks

3. **Backup Operations**
   - List backup directories and verify completeness
   - Download latest backups for restore testing
   - Upload database dumps to secure storage

4. **Configuration Management**
   - Read configuration files from remote servers
   - Write updated configs with templated content
   - List available config versions

## Best Practices

### Security
- Use key-based authentication over passwords
- Store private keys with `chmod 600` permissions
- Limit user permissions to specific directories
- Use environment variables or vaults for credentials
- Validate all file paths in templates

### Performance
- Set appropriate `max_results` limits
- Use specific `pattern` matching instead of broad searches
- Disable `recursive` when possible
- Test with small datasets before production use

### Reliability
- Always test connectivity first with `test_conn_sftp`
- Handle common errors (FileNotFound, PermissionDenied)
- Implement retry logic for transient network issues
- Monitor operation logs for troubleshooting