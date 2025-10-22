---
sidebar_position: 1
---

# NetTraceX

A comprehensive network diagnostic toolkit built with Go, featuring a beautiful terminal user interface powered by the Bubble Tea framework.

## What is NetTraceX?

NetTraceX is a modern network diagnostic tool that combines the power of traditional command-line network utilities with an intuitive terminal user interface. Built with clean architecture principles and extensive testing, it provides a unified experience for network troubleshooting and analysis.

## Key Features

- **🌐 Comprehensive Network Tools**: Built-in support for ping, traceroute, DNS lookups, WHOIS queries, and SSL certificate analysis
- **🎨 Beautiful Terminal Interface**: Powered by the Bubble Tea framework for responsive and intuitive terminal UI
- **🔧 Extensible Plugin System**: Clean architecture with SOLID principles allows for easy extension
- **⚡ High Performance**: Built with Go for fast execution and low resource usage
- **🧪 Well Tested**: Comprehensive unit tests with 100% coverage for all core components
- **📦 Cross-Platform**: Works on Windows, macOS, and Linux

## Quick Start

### Prerequisites

- Go 1.21 or later
- Make (for Unix/Linux/macOS) or PowerShell (for Windows)

### Installation

#### Unix/Linux/macOS (with Make)

```bash
# Clone the repository
git clone https://github.com/nettracex/nettracex-tui-tui.git
cd nettracex

# Download dependencies
make deps

# Build the application
make build

# Run the application
make run
```

#### Windows (PowerShell)

```powershell
# Clone the repository
git clone https://github.com/nettracex/nettracex-tui-tui.git
cd nettracex

# Download dependencies
go mod download
go mod tidy

# Build the application
go build -o bin/nettracex.exe ./cmd/nettracex

# Run the application
./bin/nettracex.exe
```

## Architecture

The project follows clean architecture principles with clear separation of concerns:

- **Domain Layer**: Core business logic interfaces and types
- **Application Layer**: Use cases and application services
- **Infrastructure Layer**: Network clients and external integrations
- **Presentation Layer**: TUI components and user interface

### SOLID Principles Implementation

- **Single Responsibility**: Each interface and type has a single, well-defined purpose
- **Open/Closed**: Plugin architecture allows extension without modification
- **Liskov Substitution**: All implementations can be substituted for their interfaces
- **Interface Segregation**: Small, focused interfaces for different concerns
- **Dependency Inversion**: High-level modules depend on abstractions

## What's Next?

- [Installation Guide](./installation) - Detailed installation instructions for all platforms
- [Configuration](./configuration) - Learn how to configure NetTraceX
- [API Reference](./api/overview) - Complete API documentation
- [Contributing](./contributing) - How to contribute to the project