---
sidebar_position: 1
---

# Quick Start Guide

Get up and running with NetTraceX in just a few minutes.

## Prerequisites

- Go 1.21 or later
- Terminal emulator (Windows Terminal, iTerm2, etc.)

## Installation

### Option 1: Build from Source

```bash
# Clone the repository
git clone https://github.com/nettracex/nettracex-tui-tui.git
cd nettracex

# Build the application
go build -o bin/nettracex ./cmd/nettracex

# Run the application
./bin/nettracex
```

### Option 2: Go Install

```bash
go install github.com/nettracex/nettracex-tui@latest
```

## First Run

When you first run NetTraceX, it will:

1. Create a default configuration file at `~/.config/nettracex/nettracex-tui.yaml`
2. Display the main interface with available tools

```bash
nettracex
```

## Basic Usage

### 1. Ping a Host

```bash
# Ping Google's DNS server
nettracex ping 8.8.8.8

# Ping with custom parameters
nettracex ping --count 10 --interval 2s google.com
```

### 2. Trace Route

```bash
# Trace route to a host
nettracex traceroute google.com

# Trace route with custom parameters
nettracex traceroute --max-hops 20 --timeout 5s github.com
```

### 3. DNS Lookup

```bash
# DNS lookup for a domain
nettracex dns google.com

# DNS lookup for specific record types
nettracex dns --types A,AAAA,MX github.com
```

### 4. WHOIS Lookup

```bash
# WHOIS lookup for a domain
nettracex whois google.com

# WHOIS lookup with specific server
nettracex whois --server whois.iana.org google.com
```

### 5. SSL Certificate Check

```bash
# SSL certificate check
nettracex ssl google.com

# SSL check with custom port
nettracex ssl --port 443 github.com
```

## Interactive Mode

NetTraceX also provides an interactive mode for continuous network monitoring:

```bash
# Start interactive mode
nettracex interactive

# Or use the short form
nettracex -i
```

In interactive mode, you can:

- Navigate between different tools using the keyboard
- View real-time results
- Export results in various formats
- Switch between different hosts and parameters

## Configuration

### Basic Configuration

Edit the configuration file at `~/.config/nettracex/nettracex-tui.yaml`:

```yaml
network:
  timeout: 30s
  dns_servers:
    - "8.8.8.8"
    - "1.1.1.1"

ui:
  theme: "auto"
  animations:
    enabled: true

plugins:
  enabled:
    - "ping"
    - "traceroute"
    - "dns"
    - "whois"
    - "ssl"
```

### Environment Variables

You can also configure using environment variables:

```bash
export NETTRACEX_NETWORK_TIMEOUT=60s
export NETTRACEX_UI_THEME=dark
export NETTRACEX_LOGGING_LEVEL=debug
```

## Exporting Results

### Export to JSON

```bash
nettracex ping google.com --export json --output results.json
```

### Export to CSV

```bash
nettracex traceroute github.com --export csv --output trace.csv
```

### Export to Text

```bash
nettracex dns google.com --export text --output dns.txt
```

## Keyboard Shortcuts

In interactive mode:

- `q` - Quit the application
- `h` - Show help
- `r` - Refresh current results
- `e` - Export current results
- `Tab` - Switch between tools
- `↑/↓` - Navigate through results
- `Enter` - Execute selected tool

## Common Use Cases

### Network Troubleshooting

```bash
# 1. Check basic connectivity
nettracex ping google.com

# 2. Trace the network path
nettracex traceroute google.com

# 3. Check DNS resolution
nettracex dns google.com

# 4. Verify SSL certificate
nettracex ssl google.com
```

### Continuous Monitoring

```bash
# Start interactive mode for continuous monitoring
nettracex interactive

# Or run specific tools in a loop
while true; do
  nettracex ping google.com
  sleep 30
done
```

### Batch Operations

```bash
# Test multiple hosts
for host in google.com github.com stackoverflow.com; do
  echo "Testing $host"
  nettracex ping $host
  nettracex dns $host
done
```

## Troubleshooting

### Common Issues

#### "command not found"

Ensure the binary is in your PATH:

```bash
# Check if binary exists
which nettracex

# Add to PATH if needed
export PATH=$PATH:/path/to/nettracex/bin
```

#### Permission Denied

Make the binary executable:

```bash
chmod +x bin/nettracex
```

#### Configuration Issues

Validate your configuration:

```bash
nettracex --validate-config
```

### Getting Help

```bash
# Show help
nettracex --help

# Show version
nettracex --version

# Show configuration
nettracex --show-config
```

## Next Steps

- [Configuration Guide](../configuration) - Learn about advanced configuration options
- [API Reference](../api/overview) - Explore the complete API
- [Plugin Development](../guides/plugin-development) - Create custom tools
- [Contributing](../guides/contributing) - Contribute to the project
