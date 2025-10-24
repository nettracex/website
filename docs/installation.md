---
sidebar_position: 2
---

# Installation

This guide will help you install NetTraceX on your system.

## Prerequisites

- **Go 1.21 or later**: Download from [golang.org](https://golang.org/dl/)
- **Make** (for Unix/Linux/macOS) or **PowerShell** (for Windows)

## Installation Methods

### Method 1: Build from Source (Recommended)

#### Unix/Linux/macOS

```bash
# Clone the repository
git clone https://github.com/nettracex/nettracex-tui.git
cd nettracex

# Download dependencies
make deps

# Build the application
make build

# Install to system (optional)
sudo make install
```

#### Windows (PowerShell)

```powershell
# Clone the repository
git clone https://github.com/nettracex/nettracex-tui.git
cd nettracex

# Download dependencies
go mod download
go mod tidy

# Build the application
go build -o bin/nettracex.exe ./cmd/nettracex

# Add to PATH (optional)
# Add the bin directory to your system PATH
```

### Method 2: Go Install

```bash
go install github.com/nettracex/nettracex-tui@latest
```

### Method 3: Package Managers

#### Homebrew (macOS)

```bash
brew install nettracex
```

#### Chocolatey (Windows)

```powershell
choco install nettracex
```

#### Snap (Linux)

```bash
sudo snap install nettracex
```

## Verification

After installation, verify that NetTraceX is working correctly:

```bash
nettracex --version
```

You should see output similar to:

```
NetTraceX v1.0.0
Built with Go 1.21.0
```

## Configuration

NetTraceX uses a hierarchical configuration system:

1. **Default values** (built-in)
2. **Configuration file** (`~/.config/nettracex/nettracex-tui.yaml`)
3. **Environment variables** (prefixed with `NETTRACEX_`)

### Initial Setup

On first run, NetTraceX will create a default configuration file:

```bash
nettracex --init-config
```

This creates `~/.config/nettracex/nettracex-tui.yaml` with default settings.

## Troubleshooting

### Common Issues

#### "command not found" on Unix/Linux/macOS

If you get a "command not found" error, ensure the binary is in your PATH:

```bash
# Check if the binary exists
ls -la bin/nettracex

# Add to PATH temporarily
export PATH=$PATH:$(pwd)/bin

# Add to PATH permanently (add to ~/.bashrc or ~/.zshrc)
echo 'export PATH=$PATH:/path/to/nettracex/bin' >> ~/.bashrc
```

#### "nettracex is not recognized" on Windows

Ensure the binary is in your system PATH:

1. Copy `nettracex.exe` to a directory in your PATH (e.g., `C:\Windows\System32`)
2. Or add the directory containing the binary to your system PATH

#### Permission Denied

On Unix/Linux/macOS, you might need to make the binary executable:

```bash
chmod +x bin/nettracex
```

### Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/nettracex/nettracex-tui/issues)
2. Join our [Discord Community](https://discord.gg/nettracex)
3. Read the [Configuration Guide](./configuration)

## Next Steps

- [Configuration](./configuration) - Learn how to configure NetTraceX
- [Quick Start Guide](./quick-start) - Get up and running quickly
- [API Reference](./api/overview) - Complete API documentation
