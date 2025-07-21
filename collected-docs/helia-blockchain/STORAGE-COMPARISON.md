# Storage Services Comparison

This document compares the three storage services integrated in our helia-blockchain project:

1. **Basic IPFS** - Core IPFS functionality using Helia
2. **Pinata Service** - Enhanced IPFS with pinning and video features
3. **Filecoin Service** - Long-term decentralized storage with cryptographic guarantees

## Feature Comparison

| Feature                    | Basic IPFS (IPFSService)      | Pinata (PinataService)                  | Filecoin (FilecoinService)                |
|----------------------------|------------------------------|----------------------------------------|------------------------------------------|
| **Storage Type**           | Content-addressed, temporary | Content-addressed, pinned              | Content-addressed, deal-based            |
| **Persistence**            | Local node only              | Centralized pinning                    | Decentralized with economic incentives   |
| **Video Support**          | Basic storage                | Enhanced with metadata                 | Optimized with deal parameters           |
| **Metadata Capabilities**  | Standard NFT metadata        | Enhanced video NFT metadata            | Full deal-aware NFT metadata             |
| **Implementation**         | Simple, in-memory            | API integration                        | Network integration                      |
| **Best Use Case**          | Development/Testing          | Production NFTs with modest budgets    | High-value NFTs needing guarantees       |
| **Cost**                   | Free (local only)            | Subscription fees                      | Storage fees based on size/time          |
| **Proof of Storage**       | None                         | API confirmation                       | Cryptographic proofs                     |
| **Integration Complexity** | Low                          | Medium                                 | High                                     |

## Use Case Recommendations

### When to use IPFSService (Basic IPFS)

- Development and testing environments
- Small metadata files (<100KB)
- Non-critical assets
- Temporary storage needs
- Local/offline applications

### When to use PinataService (Pinata)

- Production NFTs with images and smaller videos
- When you need simple API integration
- Projects with modest storage budgets
- When you need quick pinning confirmation
- When you need gateway URLs for web access

### When to use FilecoinService (Filecoin)

- High-value NFTs with large video files
- Collections requiring long-term storage guarantees
- When cryptographic proof of storage is required
- When you need verifiable storage contracts
- For truly decentralized storage of important assets

## Implementation Patterns

### Basic Pattern (IPFSService)

```typescript
import { IPFSService } from './services/ipfsService.js';

// Initialize
const ipfsService = new IPFSService();
await ipfsService.initialize();

// Store content
const cid = await ipfsService.addTextFile("Hello IPFS");

// Retrieve content
const content = await ipfsService.getTextContent(cid);
```

### Enhanced Pattern (PinataService)

```typescript
import { PinataService, FileType } from './services/pinataService.js';

// Initialize
const pinataService = new PinataService();
await pinataService.initialize();

// Store video
const result = await pinataService.processAndUploadVideo(
  "path/to/video.mp4",
  VideoQuality.HIGH
);

// Create NFT metadata
const metadataCid = await pinataService.createVideoNftMetadata(
  "My NFT",
  "Description",
  imageCid,
  result.videoCid
);

// Get gateway URL
const url = pinataService.getGatewayUrl(metadataCid);
```

### Advanced Pattern (FilecoinService)

```typescript
import { FilecoinService } from './services/filecoinService.js';

// Initialize
const filecoinService = new FilecoinService();
await filecoinService.initialize();

// Store video with deal config
const videoInfo = await filecoinService.storeVideoOnFilecoin(
  "path/to/video.mp4",
  FilecoinVideoQuality.HIGH
);

// Create enhanced metadata with deal info
const metadataCid = await filecoinService.createFilecoinVideoNftMetadata(
  "My NFT",
  "Description",
  thumbnailCid,
  videoInfo
);

// Check deal status
const status = await filecoinService.checkFilecoinDealStatus(videoInfo.videoCid);
```

## Service Architecture

All three services follow the same architectural pattern:

1. **Base Class**: `IPFSService` provides core IPFS functionality
2. **Extensions**:
   - `PinataService` extends `IPFSService` with pinning capabilities
   - `FilecoinService` extends `IPFSService` with Filecoin capabilities
3. **Common Interface**: All services implement the same core methods
4. **Storage Abstraction**: Each service handles storage differently while maintaining same interface

## Configuration

Each service has its own configuration needs. See `.env.example` for the required environment variables.
