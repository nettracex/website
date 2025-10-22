# NetTraceX Documentation Website

This is the documentation website for [NetTraceX](https://github.com/nettracex/nettracex-tui), a comprehensive network diagnostic toolkit built with Go, featuring a beautiful terminal user interface powered by the Bubble Tea framework.

## About NetTraceX

NetTraceX is a modern network diagnostic tool that combines the power of traditional command-line network utilities with an intuitive terminal user interface. Built with clean architecture principles and extensive testing, it provides a unified experience for network troubleshooting and analysis.

### Key Features

- **🌐 Comprehensive Network Tools**: Built-in support for ping, traceroute, DNS lookups, WHOIS queries, and SSL certificate analysis
- **🎨 Beautiful Terminal Interface**: Powered by the Bubble Tea framework for responsive and intuitive terminal UI
- **🔧 Extensible Plugin System**: Clean architecture with SOLID principles allows for easy extension
- **⚡ High Performance**: Built with Go for fast execution and low resource usage
- **🧪 Well Tested**: Comprehensive unit tests with 100% coverage for all core components
- **📦 Cross-Platform**: Works on Windows, macOS, and Linux

## Website Development

This documentation website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Prerequisites

- Node.js 20.0 or later
- npm or yarn

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Documentation Structure

- **[Getting Started](./docs/intro.md)** - Introduction and quick start guide
- **[Installation](./docs/installation.md)** - Detailed installation instructions
- **[Configuration](./docs/configuration.md)** - Configuration options and examples
- **[API Reference](./docs/api/overview.md)** - Complete API documentation
- **[Quick Start Guide](./docs/guides/quick-start.md)** - User guides and tutorials
- **[Development Setup](./docs/development/setup.md)** - Development setup and guidelines
- **[Contributing](./docs/guides/contributing.md)** - How to contribute to the project
- **[Changelog](./docs/changelog.md)** - Version history and release notes

## Project Links

- **Main Repository**: [nettracex](https://github.com/nettracex/nettracex-tui)
- **Documentation**: [nettracex-tui.github.io](https://nettracex-tui.github.io)
- **Issues**: [GitHub Issues](https://github.com/nettracex/nettracex-tui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nettracex/nettracex-tui/discussions)

## License

NetTraceX is licensed under the MIT License. See [LICENSE](https://github.com/nettracex/nettracex-tui/blob/main/LICENSE) for details.

## Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/guides/contributing.md) for details on how to contribute to NetTraceX.

## Author

**LAVAN J V** - Core Developer & Maintainer
- GitHub: [@jvlavan](https://github.com/jvlavan)
- LinkedIn: [lavanjv](https://www.linkedin.com/in/lavanjv/)
- Email: lavanjv@example.com
