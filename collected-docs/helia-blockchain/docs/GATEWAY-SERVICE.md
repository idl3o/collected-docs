# Gateway Service Documentation

## Overview

The Gateway Service in the helia-blockchain project provides a robust mechanism for accessing IPFS content through public gateways. It offers:

- **Multiple Gateway Support**: Configures and manages multiple IPFS gateways
- **Automatic Fallback**: Tries alternative gateways if the primary one fails
- **Health Monitoring**: Regularly checks gateway health and availability
- **Performance Tracking**: Monitors response times to select the best-performing gateway
- **Resilience**: Provides retry mechanisms with exponential backoff

## Configuration

Gateway Service can be configured through environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `IPFS_GATEWAY_URL` | Primary gateway URL | https://ipfs.io/ipfs/ |
| `IPFS_SECONDARY_GATEWAY_URL` | Secondary backup gateway | https://cloudflare-ipfs.com/ipfs/ |
| `IPFS_TERTIARY_GATEWAY_URL` | Tertiary backup gateway | https://gateway.pinata.cloud/ipfs/ |
| `IPFS_FALLBACK_GATEWAYS` | Comma-separated list of additional gateways | https://dweb.link/ipfs/,... |
| `IPFS_GATEWAY_TIMEOUT` | Request timeout in milliseconds | 5000 |
| `IPFS_GATEWAY_RETRY_ATTEMPTS` | Number of retry attempts per gateway | 3 |
| `IPFS_GATEWAY_HEALTHCHECK_INTERVAL` | Health check interval in milliseconds | 300000 (5 minutes) |

## Usage

The Gateway Service is integrated into all storage services via the base `IPFSService` class:

```typescript
// Example using IPFSService
import { IPFSService } from './services/ipfsService.js';

const ipfsService = new IPFSService();
await ipfsService.initialize();

// Get a gateway URL for a CID
const cid = 'QmXyz...';
const gatewayUrl = ipfsService.getGatewayUrl(cid);
console.log(`Gateway URL: ${gatewayUrl}`);

// Fetch content from gateway with automatic fallback
try {
  const content = await ipfsService.fetchFromGateway(cid);
  console.log(`Content length: ${content.length}`);
} catch (error) {
  console.error('Failed to fetch content from all gateways:', error);
}
```

## Advanced Features

### Direct Gateway Service Access

For advanced use cases, you can use the Gateway Service directly:

```typescript
import { GatewayService } from './services/gatewayService.js';

const gatewayService = new GatewayService(
  300000, // Health check interval (5 minutes)
  3,      // Retry attempts
  10000   // Timeout (10 seconds)
);

// Get best available gateway
const bestGateway = gatewayService.getBestGateway();

// Get status of all gateways
const gatewayStatus = gatewayService.getGatewayStatus();
console.log('Gateway status:', gatewayStatus);

// Fetch content with automatic fallback
const content = await gatewayService.fetchWithFallback(cid);
```

### Health Checks

The Gateway Service performs periodic health checks to ensure gateways are operational:

- Health checks use a known CID to test gateway responses
- Unhealthy gateways are deprioritized but still used if all others fail
- Response times are tracked to select the fastest gateway

## Integration with Other Services

All storage services (`PinataService`, `FilecoinService`, etc.) inherit from `IPFSService` and thus benefit from the Gateway Service functionality. This provides consistent gateway handling across all storage providers.

## Testing

A dedicated test script is provided to verify gateway functionality:

```bash
npm run demo:gateway
```

This script tests:
- Gateway URL generation
- Gateway health checks
- Fallback functionality
- Integration with other storage services

## Error Handling

The Gateway Service implements robust error handling:

- Network errors trigger automatic fallback to alternate gateways
- Exponential backoff between retry attempts reduces network congestion
- Comprehensive logging helps diagnose gateway issues
- Health status updates prevent repeated use of failed gateways
