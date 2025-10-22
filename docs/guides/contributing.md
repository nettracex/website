---
sidebar_position: 4
---

# Contributing to NetTraceX

Thank you for your interest in contributing to NetTraceX! This guide will help you get started with contributing to the project.

## Getting Started

### Prerequisites

- Go 1.21 or later
- Git
- Make (for Unix/Linux/macOS) or PowerShell (for Windows)
- A terminal emulator

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork the repository on GitHub, then clone your fork
   git clone https://github.com/your-username/nettracex-tui.git
   cd nettracex
   ```

2. **Set up the development environment**
   ```bash
   # Add upstream remote
   git remote add upstream https://github.com/nettracex/nettracex-tui-tui.git
   
   # Install dependencies
   go mod download
   go mod tidy
   ```

3. **Build the project**
   ```bash
   # Unix/Linux/macOS
   make build
   
   # Windows
   go build -o bin/nettracex.exe ./cmd/nettracex
   ```

4. **Run tests**
   ```bash
   # Run all tests
   go test ./...
   
   # Run tests with coverage
   go test -coverprofile=coverage.out ./...
   go tool cover -html=coverage.out
   ```

## Development Workflow

### 1. Create a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/your-bug-description
```

### 2. Make Your Changes

- Follow the existing code style and patterns
- Write tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 3. Test Your Changes

```bash
# Run the full test suite
go test ./...

# Run specific tests
go test ./internal/domain -v
go test ./internal/tools/ping -v

# Run with race detection
go test -race ./...

# Run with coverage
go test -cover ./...
```

### 4. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new diagnostic tool for network latency"
```

### 5. Push and Create a Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## Code Style and Standards

### Go Code Style

- Follow the [Effective Go](https://golang.org/doc/effective_go.html) guidelines
- Use `gofmt` to format your code
- Use `golint` to check for style issues
- Use `go vet` to check for potential issues

```bash
# Format code
go fmt ./...

# Check for issues
go vet ./...

# Lint code (if golangci-lint is installed)
golangci-lint run
```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Maintenance tasks

Examples:
```
feat: add SSL certificate validation tool
fix: resolve timeout issue in ping tool
docs: update installation guide
test: add unit tests for DNS tool
```

### Code Organization

Follow the clean architecture principles:

```
internal/
├── domain/           # Core business logic
│   ├── interfaces.go
│   ├── types.go
│   └── *_test.go
├── application/      # Use cases
│   ├── services/
│   └── handlers/
├── infrastructure/   # External dependencies
│   ├── network/
│   └── storage/
└── presentation/     # UI components
    ├── tui/
    └── cli/
```

## Testing Guidelines

### Unit Tests

- Write tests for all public functions
- Aim for high test coverage (80%+)
- Use table-driven tests for multiple scenarios
- Mock external dependencies

Example:
```go
func TestPingTool_Execute(t *testing.T) {
    tests := []struct {
        name    string
        params  PingParameters
        want    PingResult
        wantErr bool
    }{
        {
            name: "successful ping",
            params: PingParameters{
                Host:   "8.8.8.8",
                Count:  4,
            },
            want: PingResult{
                Host: "8.8.8.8",
                // ... expected result
            },
            wantErr: false,
        },
        // ... more test cases
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            tool := &PingTool{}
            got, err := tool.Execute(context.Background(), tt.params)
            
            if (err != nil) != tt.wantErr {
                t.Errorf("Execute() error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            
            if !reflect.DeepEqual(got, tt.want) {
                t.Errorf("Execute() = %v, want %v", got, tt.want)
            }
        })
    }
}
```

### Integration Tests

- Test the complete workflow
- Use real network calls (with timeouts)
- Test error handling and edge cases

### Performance Tests

- Benchmark critical functions
- Test with large datasets
- Monitor memory usage

```go
func BenchmarkPingTool_Execute(b *testing.B) {
    tool := &PingTool{}
    params := PingParameters{
        Host:  "8.8.8.8",
        Count: 4,
    }
    
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        _, err := tool.Execute(context.Background(), params)
        if err != nil {
            b.Fatal(err)
        }
    }
}
```

## Documentation

### Code Documentation

- Document all public functions and types
- Use Go doc comments
- Include examples for complex functions

```go
// PingTool implements the DiagnosticTool interface for network ping operations.
// It provides ICMP ping functionality with configurable parameters.
type PingTool struct {
    client NetworkClient
}

// Execute performs a ping operation to the specified host.
// It returns a PingResult containing packet information and statistics.
//
// Example:
//   tool := &PingTool{client: networkClient}
//   result, err := tool.Execute(ctx, PingParameters{
//       Host: "google.com",
//       Count: 4,
//   })
func (p *PingTool) Execute(ctx context.Context, params Parameters) (Result, error) {
    // Implementation...
}
```

### User Documentation

- Update README.md for new features
- Add examples and use cases
- Update configuration documentation
- Add troubleshooting guides

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass**
   ```bash
   go test ./...
   ```

2. **Check code style**
   ```bash
   go fmt ./...
   go vet ./...
   ```

3. **Update documentation**
   - Update README.md if needed
   - Add/update doc comments
   - Update configuration docs

4. **Test your changes**
   - Test on different platforms
   - Test with different configurations
   - Test edge cases

### Pull Request Template

When creating a pull request, include:

- **Description**: What changes were made and why
- **Type**: Feature, bug fix, documentation, etc.
- **Testing**: How the changes were tested
- **Breaking Changes**: Any breaking changes
- **Screenshots**: For UI changes
- **Checklist**: Ensure all items are completed

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and checks
2. **Code Review**: Maintainers review the code
3. **Testing**: Changes are tested in different environments
4. **Approval**: At least one maintainer must approve
5. **Merge**: Changes are merged to main branch

## Issue Reporting

### Bug Reports

When reporting bugs, include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, Go version, etc.
- **Logs**: Relevant error messages or logs

### Feature Requests

When requesting features, include:

- **Description**: Clear description of the feature
- **Use Case**: Why this feature is needed
- **Proposed Solution**: How you think it should work
- **Alternatives**: Other solutions considered

## Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn
- Follow the project's coding standards

### Getting Help

- Check existing issues and discussions
- Ask questions in GitHub Discussions
- Join our Discord community
- Read the documentation

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Release notes prepared
- [ ] Tag created
- [ ] Release published

## Recognition

Contributors are recognized in:

- CONTRIBUTORS.md file
- Release notes
- Project documentation
- GitHub contributors page

Thank you for contributing to NetTraceX! 🚀
