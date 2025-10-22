---
sidebar_position: 3
---

# Configuration

NetTraceX uses a hierarchical configuration system that allows you to customize the application behavior.

## Configuration Hierarchy

NetTraceX loads configuration in the following order (later values override earlier ones):

1. **Default values** (built-in)
2. **Configuration file** (`~/.config/nettracex/nettracex-tui.yaml`)
3. **Environment variables** (prefixed with `NETTRACEX_`)

## Configuration File

The main configuration file is located at `~/.config/nettracex/nettracex-tui.yaml`.

### Creating a Configuration File

```bash
# Initialize with default configuration
nettracex --init-config

# Or create manually
mkdir -p ~/.config/nettracex
touch ~/.config/nettracex/nettracex-tui.yaml
```

### Configuration Sections

#### Network Settings

```yaml
network:
  timeout: 30s
  dns_servers:
    - "8.8.8.8"
    - "1.1.1.1"
  retry_count: 3
  retry_delay: 1s
  user_agent: "NetTraceX/1.0.0"
```

#### UI Settings

```yaml
ui:
  theme: "auto"  # auto, light, dark
  key_bindings:
    quit: "q"
    help: "?"
    refresh: "r"
  animations:
    enabled: true
    duration: 200ms
  layout:
    sidebar_width: 30
    status_bar_height: 1
```

#### Plugin Settings

```yaml
plugins:
  enabled:
    - "ping"
    - "traceroute"
    - "dns"
    - "whois"
    - "ssl"
  disabled: []
  custom:
    ping:
      count: 4
      interval: 1s
    traceroute:
      max_hops: 30
      timeout: 5s
```

#### Export Settings

```yaml
export:
  default_format: "json"  # json, csv, text
  output_directory: "~/nettracex-exports"
  filename_template: "nettracex-{timestamp}.{format}"
  include_metadata: true
```

#### Logging Settings

```yaml
logging:
  level: "info"  # debug, info, warn, error
  format: "json"  # json, text
  output: "stderr"  # stdout, stderr, file
  file_path: "~/.config/nettracex/nettracex-tui.log"
  max_size: "10MB"
  max_backups: 3
  max_age: 28
```

## Environment Variables

You can override configuration using environment variables:

```bash
# Network settings
export NETTRACEX_NETWORK_TIMEOUT=60s
export NETTRACEX_NETWORK_DNS_SERVERS="8.8.8.8,1.1.1.1"

# UI settings
export NETTRACEX_UI_THEME=dark
export NETTRACEX_UI_ANIMATIONS_ENABLED=false

# Logging settings
export NETTRACEX_LOGGING_LEVEL=debug
export NETTRACEX_LOGGING_FORMAT=text
```

## Configuration Validation

NetTraceX validates configuration on startup:

```bash
# Validate configuration
nettracex --validate-config

# Check configuration with verbose output
nettracex --config-debug
```

## Plugin Configuration

### Built-in Plugins

#### Ping Plugin

```yaml
plugins:
  ping:
    count: 4
    interval: 1s
    timeout: 5s
    packet_size: 56
    ttl: 64
```

#### Traceroute Plugin

```yaml
plugins:
  traceroute:
    max_hops: 30
    timeout: 5s
    packet_size: 40
    protocol: "udp"  # udp, tcp, icmp
```

#### DNS Plugin

```yaml
plugins:
  dns:
    record_types:
      - "A"
      - "AAAA"
      - "MX"
      - "TXT"
    timeout: 5s
    retry_count: 3
```

#### WHOIS Plugin

```yaml
plugins:
  whois:
    timeout: 10s
    retry_count: 2
    servers:
      - "whois.iana.org"
      - "whois.arin.net"
```

#### SSL Plugin

```yaml
plugins:
  ssl:
    timeout: 10s
    verify_certificate: true
    check_expiry: true
    check_chain: true
```

### Custom Plugins

You can add custom plugins by creating configuration entries:

```yaml
plugins:
  custom:
    my_plugin:
      enabled: true
      config:
        custom_setting: "value"
```

## Advanced Configuration

### Multiple Configuration Files

You can use multiple configuration files:

```bash
# Use specific configuration file
nettracex --config /path/to/config.yaml

# Merge multiple configuration files
nettracex --config /path/to/base.yaml --config /path/to/override.yaml
```

### Configuration Templates

Create configuration templates for different environments:

```bash
# Development configuration
nettracex --config ~/.config/nettracex/dev.yaml

# Production configuration
nettracex --config ~/.config/nettracex/prod.yaml
```

## Troubleshooting Configuration

### Common Issues

#### Invalid YAML Syntax

```bash
# Validate YAML syntax
yamllint ~/.config/nettracex/nettracex-tui.yaml

# Or use NetTraceX validation
nettracex --validate-config
```

#### Configuration Not Loading

1. Check file permissions:
   ```bash
   ls -la ~/.config/nettracex/nettracex-tui.yaml
   ```

2. Verify file location:
   ```bash
   nettracex --config-debug
   ```

3. Check for syntax errors:
   ```bash
   nettracex --validate-config
   ```

### Debugging

```bash
# Show current configuration
nettracex --show-config

# Show configuration sources
nettracex --config-sources

# Debug configuration loading
nettracex --config-debug
```

## Next Steps

- [Quick Start Guide](./quick-start) - Get up and running quickly
- [API Reference](./api/overview) - Complete API documentation
- [Plugin Development](./plugins/development) - Learn how to create custom plugins
