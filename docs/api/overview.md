---
sidebar_position: 1
---

# API Overview

NetTraceX provides a comprehensive API for network diagnostics and tool integration.

## Core Interfaces

### DiagnosticTool

The main interface for all network diagnostic tools.

```go
type DiagnosticTool interface {
    Name() string
    Description() string
    Execute(ctx context.Context, params Parameters) (Result, error)
    Validate(params Parameters) error
    GetDefaultParameters() Parameters
}
```

### NetworkClient

Abstracts network operations for testing and flexibility.

```go
type NetworkClient interface {
    Ping(ctx context.Context, host string, params PingParameters) (PingResult, error)
    TraceRoute(ctx context.Context, host string, params TraceRouteParameters) (TraceRouteResult, error)
    DNSLookup(ctx context.Context, domain string, params DNSParameters) (DNSResult, error)
    WHOISLookup(ctx context.Context, domain string, params WHOISParameters) (WHOISResult, error)
    SSLCheck(ctx context.Context, host string, params SSLParameters) (SSLResult, error)
}
```

### Result

Represents diagnostic operation results with formatting and export capabilities.

```go
type Result interface {
    Format(format Format) (string, error)
    Export(path string, format Format) error
    GetMetadata() Metadata
    GetData() interface{}
}
```

## Built-in Tools

### Ping Tool

```go
type PingTool struct {
    client NetworkClient
}

func (p *PingTool) Execute(ctx context.Context, params Parameters) (Result, error) {
    pingParams := params.(PingParameters)
    return p.client.Ping(ctx, pingParams.Host, pingParams)
}
```

### Traceroute Tool

```go
type TracerouteTool struct {
    client NetworkClient
}

func (t *TracerouteTool) Execute(ctx context.Context, params Parameters) (Result, error) {
    traceParams := params.(TraceRouteParameters)
    return t.client.TraceRoute(ctx, traceParams.Host, traceParams)
}
```

### DNS Tool

```go
type DNSTool struct {
    client NetworkClient
}

func (d *DNSTool) Execute(ctx context.Context, params Parameters) (Result, error) {
    dnsParams := params.(DNSParameters)
    return d.client.DNSLookup(ctx, dnsParams.Domain, dnsParams)
}
```

### WHOIS Tool

```go
type WHOISTool struct {
    client NetworkClient
}

func (w *WHOISTool) Execute(ctx context.Context, params Parameters) (Result, error) {
    whoisParams := params.(WHOISParameters)
    return w.client.WHOISLookup(ctx, whoisParams.Domain, whoisParams)
}
```

### SSL Tool

```go
type SSLTool struct {
    client NetworkClient
}

func (s *SSLTool) Execute(ctx context.Context, params Parameters) (Result, error) {
    sslParams := params.(SSLParameters)
    return s.client.SSLCheck(ctx, sslParams.Host, sslParams)
}
```

## Parameter Types

### PingParameters

```go
type PingParameters struct {
    Host        string        `json:"host" yaml:"host"`
    Count       int           `json:"count" yaml:"count"`
    Interval    time.Duration `json:"interval" yaml:"interval"`
    Timeout     time.Duration `json:"timeout" yaml:"timeout"`
    PacketSize  int           `json:"packet_size" yaml:"packet_size"`
    TTL         int           `json:"ttl" yaml:"ttl"`
}
```

### TraceRouteParameters

```go
type TraceRouteParameters struct {
    Host     string        `json:"host" yaml:"host"`
    MaxHops  int           `json:"max_hops" yaml:"max_hops"`
    Timeout  time.Duration `json:"timeout" yaml:"timeout"`
    Protocol string        `json:"protocol" yaml:"protocol"`
}
```

### DNSParameters

```go
type DNSParameters struct {
    Domain      string   `json:"domain" yaml:"domain"`
    RecordTypes []string `json:"record_types" yaml:"record_types"`
    Server      string   `json:"server" yaml:"server"`
    Timeout     time.Duration `json:"timeout" yaml:"timeout"`
}
```

### WHOISParameters

```go
type WHOISParameters struct {
    Domain string        `json:"domain" yaml:"domain"`
    Server string        `json:"server" yaml:"server"`
    Timeout time.Duration `json:"timeout" yaml:"timeout"`
}
```

### SSLParameters

```go
type SSLParameters struct {
    Host              string `json:"host" yaml:"host"`
    Port              int    `json:"port" yaml:"port"`
    VerifyCertificate bool   `json:"verify_certificate" yaml:"verify_certificate"`
    CheckExpiry       bool   `json:"check_expiry" yaml:"check_expiry"`
    CheckChain        bool   `json:"check_chain" yaml:"check_chain"`
}
```

## Result Types

### PingResult

```go
type PingResult struct {
    Host     string        `json:"host"`
    Packets  []PacketInfo  `json:"packets"`
    Summary  PingSummary   `json:"summary"`
    Duration time.Duration `json:"duration"`
}
```

### TraceRouteResult

```go
type TraceRouteResult struct {
    Host string     `json:"host"`
    Hops []HopInfo  `json:"hops"`
    Summary TraceRouteSummary `json:"summary"`
}
```

### DNSResult

```go
type DNSResult struct {
    Domain string       `json:"domain"`
    Records []DNSRecord `json:"records"`
    Server  string      `json:"server"`
}
```

### WHOISResult

```go
type WHOISResult struct {
    Domain    string            `json:"domain"`
    Data      map[string]string `json:"data"`
    Server    string            `json:"server"`
    RawData   string            `json:"raw_data"`
}
```

### SSLResult

```go
type SSLResult struct {
    Host        string    `json:"host"`
    Port        int       `json:"port"`
    Certificate CertInfo  `json:"certificate"`
    Chain       []CertInfo `json:"chain"`
    Valid       bool      `json:"valid"`
}
```

## Configuration API

### ConfigurationManager

```go
type ConfigurationManager interface {
    Load() (*Config, error)
    Save(config *Config) error
    Validate(config *Config) error
    Get(key string) (interface{}, error)
    Set(key string, value interface{}) error
}
```

### Config Structure

```go
type Config struct {
    Network  NetworkConfig  `yaml:"network"`
    UI       UIConfig       `yaml:"ui"`
    Plugins  PluginsConfig  `yaml:"plugins"`
    Export   ExportConfig   `yaml:"export"`
    Logging  LoggingConfig  `yaml:"logging"`
}
```

## Error Handling

### Custom Error Types

```go
type DiagnosticError struct {
    Tool    string
    Message string
    Cause   error
}

func (e *DiagnosticError) Error() string {
    return fmt.Sprintf("%s: %s", e.Tool, e.Message)
}

func (e *DiagnosticError) Unwrap() error {
    return e.Cause
}
```

### Error Handling Best Practices

```go
func (t *Tool) Execute(ctx context.Context, params Parameters) (Result, error) {
    if err := t.Validate(params); err != nil {
        return nil, &DiagnosticError{
            Tool:    t.Name(),
            Message: "parameter validation failed",
            Cause:   err,
        }
    }
    
    // Execute tool logic...
}
```

## Next Steps

- [Ping API](./ping) - Detailed Ping tool API
- [Traceroute API](./traceroute) - Detailed Traceroute tool API
- [DNS API](./dns) - Detailed DNS tool API
- [WHOIS API](./whois) - Detailed WHOIS tool API
- [SSL API](./ssl) - Detailed SSL tool API
