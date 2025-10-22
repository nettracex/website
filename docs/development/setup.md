---
sidebar_position: 1
---

# Development Setup

This guide will help you set up a development environment for NetTraceX.

## Prerequisites

### Required Software

- **Go 1.21 or later**: Download from [golang.org](https://golang.org/dl/)
- **Git**: For version control
- **Make** (Unix/Linux/macOS) or **PowerShell** (Windows): For build automation
- **Terminal Emulator**: For testing the TUI

### Recommended Software

- **VS Code** with Go extension
- **GoLand/IntelliJ IDEA** with Go plugin
- **Delve**: Go debugger
- **golangci-lint**: Go linter
- **Air**: Live reload for development

## Environment Setup

### 1. Clone the Repository

```bash
# Clone the main repository
git clone https://github.com/nettracex/nettracex-tui-tui.git
cd nettracex

# Or clone your fork
git clone https://github.com/your-username/nettracex-tui.git
cd nettracex
```

### 2. Install Dependencies

```bash
# Download Go modules
go mod download
go mod tidy

# Install development tools
go install github.com/go-delve/delve/cmd/dlv@latest
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
go install github.com/cosmtrek/air@latest
```

### 3. Verify Installation

```bash
# Check Go version
go version

# Check if tools are installed
dlv version
golangci-lint version
air -v
```

## IDE Setup

### Visual Studio Code

1. **Install the Go extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Go" and install the official Go extension

2. **Configure Go tools**
   - Press Ctrl+Shift+P
   - Type "Go: Install/Update Tools"
   - Select all tools and install

3. **Configure settings** (`.vscode/settings.json`):
   ```json
   {
     "go.toolsManagement.checkForUpdates": "local",
     "go.useLanguageServer": true,
     "go.formatTool": "goimports",
     "go.lintTool": "golangci-lint",
     "go.testFlags": ["-v"],
     "go.coverOnSave": true,
     "go.buildOnSave": "package",
     "go.vetOnSave": "package",
     "go.lintOnSave": "package"
   }
   ```

### GoLand/IntelliJ IDEA

1. **Install the Go plugin**
   - Go to Settings → Plugins
   - Search for "Go" and install

2. **Configure Go SDK**
   - Go to Settings → Languages & Frameworks → Go
   - Set the Go SDK path
   - Enable Go modules support

3. **Configure code style**
   - Go to Settings → Editor → Code Style → Go
   - Import the project's code style settings

## Project Structure

```
nettracex/
├── cmd/
│   └── nettracex/
│       └── main.go              # Application entry point
├── internal/
│   ├── domain/                  # Core business logic
│   │   ├── interfaces.go
│   │   ├── types.go
│   │   ├── parameters.go
│   │   ├── result.go
│   │   └── *_test.go
│   ├── application/              # Use cases
│   │   ├── services/
│   │   └── handlers/
│   ├── infrastructure/          # External dependencies
│   │   ├── network/
│   │   └── storage/
│   └── presentation/            # UI components
│       ├── tui/
│       └── cli/
├── pkg/                         # Public packages
├── testdata/                    # Test data files
├── scripts/                     # Build and deployment scripts
├── docs/                        # Documentation
├── examples/                    # Example configurations
├── go.mod                       # Go module definition
├── go.sum                       # Go module checksums
├── Makefile                     # Build automation
├── .gitignore                   # Git ignore rules
├── .golangci.yml                # Linter configuration
├── .air.toml                    # Air configuration
└── README.md                    # Project documentation
```

## Development Workflow

### 1. Start Development Server

```bash
# Using Air for live reload
air

# Or manually
go run ./cmd/nettracex
```

### 2. Run Tests

```bash
# Run all tests
go test ./...

# Run tests with coverage
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out

# Run specific tests
go test ./internal/domain -v
go test ./internal/tools/ping -v
```

### 3. Code Quality Checks

```bash
# Format code
go fmt ./...

# Check for issues
go vet ./...

# Lint code
golangci-lint run

# Check for security issues
go list -json -deps ./... | nancy sleuth
```

### 4. Build the Application

```bash
# Unix/Linux/macOS
make build

# Windows
go build -o bin/nettracex.exe ./cmd/nettracex

# Cross-platform builds
make build-all
```

## Configuration

### Development Configuration

Create a development configuration file:

```yaml
# config/dev.yaml
network:
  timeout: 10s
  dns_servers:
    - "8.8.8.8"
    - "1.1.1.1"

ui:
  theme: "dark"
  animations:
    enabled: true

logging:
  level: "debug"
  format: "text"
  output: "stdout"

plugins:
  enabled:
    - "ping"
    - "traceroute"
    - "dns"
    - "whois"
    - "ssl"
```

### Environment Variables

```bash
# Development environment
export NETTRACEX_ENV=development
export NETTRACEX_LOGGING_LEVEL=debug
export NETTRACEX_LOGGING_FORMAT=text
export NETTRACEX_UI_ANIMATIONS_ENABLED=true
```

## Debugging

### Using Delve

```bash
# Debug the main application
dlv debug ./cmd/nettracex

# Debug with arguments
dlv debug ./cmd/nettracex -- --config config/dev.yaml

# Debug tests
dlv test ./internal/domain
```

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch NetTraceX",
      "type": "go",
      "request": "launch",
      "mode": "auto",
      "program": "${workspaceFolder}/cmd/nettracex",
      "args": ["--config", "config/dev.yaml"],
      "env": {
        "NETTRACEX_ENV": "development"
      }
    },
    {
      "name": "Debug Tests",
      "type": "go",
      "request": "launch",
      "mode": "test",
      "program": "${workspaceFolder}/internal/domain"
    }
  ]
}
```

## Testing

### Unit Tests

```bash
# Run all unit tests
go test ./...

# Run with verbose output
go test -v ./...

# Run with race detection
go test -race ./...

# Run with coverage
go test -cover ./...

# Run specific test
go test -run TestPingTool ./internal/tools/ping
```

### Integration Tests

```bash
# Run integration tests
go test -tags=integration ./...

# Run with network tests
go test -tags=network ./...
```

### Benchmark Tests

```bash
# Run benchmarks
go test -bench=. ./...

# Run specific benchmark
go test -bench=BenchmarkPingTool ./internal/tools/ping
```

## Continuous Integration

### GitHub Actions

The project uses GitHub Actions for CI/CD. The workflow includes:

- Go version matrix (1.21, 1.22, 1.23)
- Linting with golangci-lint
- Testing with coverage
- Security scanning
- Cross-platform builds

### Local CI Simulation

```bash
# Run the same checks as CI
make ci

# Or manually
go test ./...
go vet ./...
golangci-lint run
go build ./...
```

## Performance Profiling

### CPU Profiling

```bash
# Run with CPU profiling
go run -cpuprofile=cpu.prof ./cmd/nettracex

# Analyze profile
go tool pprof cpu.prof
```

### Memory Profiling

```bash
# Run with memory profiling
go run -memprofile=mem.prof ./cmd/nettracex

# Analyze profile
go tool pprof mem.prof
```

### Benchmarking

```bash
# Run benchmarks
go test -bench=. -benchmem ./...

# Run with profiling
go test -bench=. -cpuprofile=cpu.prof ./...
```

## Troubleshooting

### Common Issues

#### Go Module Issues

```bash
# Clean module cache
go clean -modcache

# Download modules
go mod download

# Tidy modules
go mod tidy
```

#### Build Issues

```bash
# Clean build cache
go clean -cache

# Rebuild
go build ./...
```

#### Test Issues

```bash
# Clean test cache
go clean -testcache

# Run tests with verbose output
go test -v ./...
```

### Getting Help

- Check the [GitHub Issues](https://github.com/nettracex/nettracex-tui/issues)
- Join our [Discord Community](https://discord.gg/nettracex)
- Read the [Documentation](../intro)
- Ask questions in [GitHub Discussions](https://github.com/nettracex/nettracex-tui/discussions)

## Next Steps

- [Testing Guide](./testing) - Learn about testing strategies
- [Architecture Guide](./architecture) - Understand the project architecture
- [Contributing Guide](../guides/contributing) - Learn how to contribute
- [API Reference](../api/overview) - Explore the complete API
