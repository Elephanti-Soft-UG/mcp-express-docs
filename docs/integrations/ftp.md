# FTP Connector for MCP Express

Integrate MCP Express with FTP servers to build custom tools that can seamlessly query, transfer, and manage files on remote file servers. This powerful integration enables you to execute flexible file operations against FTP servers, retrieve file listings and contents, and use the results in your MCP tools.

## Configuration

### Connection Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| hostname | Yes | FTP server hostname or IP address (supports `host` field) |
| port | No | FTP port number (defaults to 21) |
| username | Yes | Username for FTP authentication |
| password | Yes | Password for authentication |
| action | Yes | Operation type: `list`, `search`, `read`, `write`, `upload`, `download` |

## Setting Up FTP Integration

1. **Select FTP Integration**: In your MCP server dashboard, choose "FTP" from available integrations
2. **Configure Connection**: Enter hostname, port, username, and password
3. **Choose Operation**: Select the specific file operation (`action`) you want to perform
4. **Set Paths**: Define remote paths, local paths, patterns, or content based on your operation
5. **Configure Options**: Set recursive search, overwrite behavior, encoding, and limits
6. **Test Connection**: Use the built-in `testconnftp` to verify connectivity
7. **Save Configuration**: Store for reuse across multiple MCP tool executions

## Operating Modes

Each operation uses the same connection parameters but different action-specific fields:

### List Files & Directories
**Purpose**: Inventory files and directories with metadata (size, permissions)

**Example Config**:
```json
{
  "action": "list",
  "hostname": "ftp.example.com",
  "remotepath": "/data",
  "recursive": false
}
```

### Search Files by Pattern
**Purpose**: Find files matching patterns like `*.log` or `*.pdf` recursively

**Example Config**:
```json
{
  "action": "search", 
  "hostname": "ftp.example.com",
  "remotepath": "/logs",
  "pattern": "*.log"
}
```

### Read File Contents
**Purpose**: Retrieve file content (text or binary as base64)

**Example Config**:
```json
{
  "action": "read",
  "hostname": "ftp.example.com",
  "remotefilepath": "/config/app.json",
  "encoding": "auto"
}
```

### Write/Create Files
**Purpose**: Create new files or update existing ones with content

**Example Config**:
```json
{
  "action": "write",
  "hostname": "ftp.example.com",
  "remotefilepath": "/output/report.json",
  "filecontent": "{\"status\": \"success\"}",
  "encoding": "utf-8"
}
```

### Upload Files
**Purpose**: Transfer local files to remote FTP server

**Example Config**:
```json
{
  "action": "upload",
  "hostname": "ftp.example.com",
  "localfilepath": "/tmp/data.csv",
  "remotefilepath": "/incoming/data.csv"
}
```

### Download Files
**Purpose**: Transfer remote files to local system

**Example Config**:
```json
{
  "action": "download", 
  "hostname": "ftp.example.com",
  "remotefilepath": "/backups/daily.tar.gz",
  "localfilepath": "/tmp/backup.tar.gz"
}
```

## Jinja2 Template Support

The FTP integration uses templating to create dynamic file operations based on tool inputs. Multiple fields support templating:

**Template Syntax**: Variables from tool inputs referenced using `{{ variable_name }}`:
```json
{
  "remotepath": "/logs/{{ date }}/{{ service }}",
  "pattern": "{{ file_pattern }}.log"
}
```

**Supported Template Fields** (by operation):
- `remotepath`, `remotefilepath` - All operations
- `pattern` - Search operation  
- `filecontent` - Write operation
- `localfilepath`, `remotefilepath` - Upload/Download operations

**Example with Tool Inputs**:
```json
{
  "action": "search",
  "remotepath": "/logs/{{year}}/{{month}}",
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
  "hostname": "prod-ftp.example.com", 
  "remotepath": "/uploads"
}
```

**Daily backup verification**:
```json
{
  "action": "search",
  "remotepath": "/backups",
  "pattern": "backup-{{ today }}.tar.gz"
}
```

### Dynamic Template Operations
Parameterized operations accepting tool inputs:

**Service-specific log search**:
```json
{
  "action": "search",
  "remotepath": "/logs",
  "pattern": "{{ service }}*.log",
  "recursive": true
}
```

**Dynamic file processing**:
```json
{
  "action": "read", 
  "remotefilepath": "/data/{{ order_id }}.json"
}
```

## Authentication Methods

### Password Authentication
```
"username": "user", 
"password": "securepass123"
```

**Security Note**: FTP transmits credentials in plain text. Use FTPS (FTP over SSL) when possible for encrypted connections.

## Security Features

### Credential Protection
- Passwords encrypted at rest
- Credentials never displayed in plain text after configuration
- Secure storage protocols

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
   - Upload processed CSV files to partner FTP
   - Download incoming files for processing
   - Verify file transfers with size checks

3. **Backup Operations**
   - List backup directories and verify completeness
   - Download latest backups for restore testing
   - Upload database dumps to storage

4. **Configuration Management**
   - Read configuration files from remote servers
   - Write updated configs with templated content
   - List available config versions

## Best Practices

### Security
- Use FTPS (FTP over SSL/TLS) instead of plain FTP when available
- Limit user permissions to specific directories
- Use environment variables or vaults for credentials
- Validate all file paths in templates

### Performance
- Set appropriate `maxresults` limits
- Use specific `pattern` matching instead of broad searches
- Disable `recursive` when possible
- Test with small datasets before production use

### Reliability
- Always test connectivity first with `testconnftp`
- Handle common errors (FileNotFound, PermissionDenied)
- Implement retry logic for transient network issues
- Monitor operation logs for troubleshooting