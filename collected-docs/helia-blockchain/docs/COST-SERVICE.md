# Cost Service Documentation

The Cost Service provides tools for estimating and comparing storage costs across different decentralized storage options available in the helia-blockchain project.

## Overview

The Cost Service helps developers make informed decisions about which storage service to use based on:
- File type (metadata, images, videos, etc.)
- File size
- Required storage duration
- Budget constraints
- Reliability requirements

## Services Compared

The service includes cost calculations for:
- **IPFS**: Temporary storage (no persistence guarantees)
- **Pinata**: Reliable pinning service with different tiers
- **Filecoin**: Decentralized storage with deal verification
- **Web3.Storage**: Combined solution with various features

## Usage

### Command-Line Interface

The project includes a CLI tool for cost projections:

```bash
# Analyze a specific file
npm run cost:file ./path/to/file.mp4 12  # (12 months duration)

# Estimate cost based on size in MB
npm run cost:size 100 6  # (100 MB for 6 months)

# Compare all services for different file types
npm run cost:compare-all 1000  # (1000 MB)
```

### API Endpoints

The webapp provides a REST API for cost calculations:

```
POST /api/cost/estimate
```

Request body:
```json
{
  "sizeInMB": 100,
  "fileType": "VIDEO",
  "durationMonths": 12
}
```

Response:
```json
{
  "success": true,
  "fileSize": {
    "mb": 100,
    "gb": 0.0976
  },
  "fileType": "VIDEO",
  "duration": 12,
  "costs": {
    "ipfs": {
      "service": "ipfs",
      "cost": 0,
      "details": "No persistence guarantees"
    },
    "pinata": {
      "service": "pinata",
      "cost": 0.175,
      "details": "Reliable pinning service"
    },
    "filecoin": {
      "service": "filecoin",
      "cost": 0.5,
      "details": "Decentralized storage with deal verification"
    }
  },
  "recommendation": {
    "serviceType": "filecoin",
    "cost": 0.5,
    "reason": "Recommended for video content with best long-term value"
  }
}
```

### Programmatic Usage

The CostService can be used directly in your code:

```typescript
import { CostService, StorageServiceType, StorageDuration, FileType } from '../services/costService.js';

// Initialize the service
const costService = new CostService();

// Calculate specific costs
const pinataCost = costService.calculateCost(
  StorageServiceType.PINATA,
  FileType.IMAGE,
  0.5, // size in GB
  12 as StorageDuration // 12 months
);

// Get a service recommendation
const recommendation = costService.getRecommendedService(
  FileType.VIDEO,
  1.5 // size in GB
);
```

## Storage Selection Guidelines

The service follows these guidelines when making recommendations:

| Content Type | Development | Standard Production | Premium Production |
|--------------|-------------|---------------------|-------------------|
| Metadata/JSON | IPFSService | PinataService | PinataService + FilecoinService |
| Images | IPFSService | PinataService | PinataService + FilecoinService |
| Videos | IPFSService | PinataService | FilecoinService |
| Large Files | IPFSService | Web3StorageService | FilecoinService |

## Cost Factors

The cost calculations consider:
- Base storage costs per GB
- Service tier (standard vs. premium)
- File type-specific pricing
- Duration of storage
- Replication factor
- Quality level (for videos)
- Minimum deal costs (for Filecoin)

## Best Practices

- For rapid development and testing, use IPFS (free but with no persistence)
- For small metadata and images in production, use Pinata for best value
- For long-term storage of important data, use Filecoin
- For large files, consider chunking to optimize costs
- Use the cost comparison tools before implementing your storage strategy
