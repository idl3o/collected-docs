# Helia-Blockchain Standards

This document compiles the official standards and best practices for the helia-blockchain project. It serves as the authoritative reference for developers working with or extending the project.

## 1. Storage Service Standards

### 1.1. Service Interface Requirements

All storage services must implement the following base interface:

| Method | Required | Description |
|--------|----------|-------------|
| `initialize()` | Yes | Initialize the service |
| `addText(text: string)` | Yes | Add text content to storage |
| `getText(cid: CID)` | Yes | Retrieve text content by CID |
| `addJson(json: object)` | Yes | Add JSON object to storage |
| `getJson(cid: CID)` | Yes | Retrieve JSON object by CID |
| `getGatewayUrl(cid: CID)` | Yes | Generate gateway URL for a CID |
| `addFile(path: string)` | Yes | Add file to storage |

### 1.2. Gateway Standards

- All gateway URLs must support the `ipfs://` URI scheme conversion
- Gateway failover implementation required for production services
- Multi-gateway support required for all extended services
- Gateway health check mechanisms must be implemented
- Link structure: `https://{gateway-domain}/ipfs/{cid}`

### 1.3. Service Extensions Standards

Extended services must implement additional service-specific methods:

| Service | Required Methods |
|---------|-----------------|
| **PinataService** | `pinCid()`, `pinFile()`, `unpinCid()` |
| **FilecoinService** | `storeFile()`, `storeVideoNFT()`, `checkDealStatus()` |
| **Web3StorageService** | `uploadFile()`, `uploadDirectory()`, `uploadContent()`, `getStatus()` |
| **FilecoinEcosystemService** | `registerParticipant()`, `createContentStream()`, `getStreamSession()`, `getStreamChunk()`, `closeStreamSession()` |

### 1.4. Service Selection Guidelines

| Content Type | Development | Standard Production | Premium Production |
|--------------|-------------|---------------------|-------------------|
| Metadata/JSON | IPFSService | PinataService | PinataService + FilecoinService |
| Images | IPFSService | PinataService | PinataService + FilecoinService |
| Videos | IPFSService | PinataService | FilecoinService |
| Large Files | IPFSService | Web3StorageService | FilecoinService |
| Streaming Media | - | - | FilecoinEcosystemService |

## 2. Protocol Mutation Standards

### 2.1. Mutation Types

All protocol mutations must conform to one of the standard mutation types:

```typescript
enum ProtocolMutationType {
  ENCRYPTION = 'encryption',
  COMPRESSION = 'compression',
  CHUNKING = 'chunking',
  VERSIONING = 'versioning',
  METADATA_ENHANCEMENT = 'metadata-enhancement'
}
```

### 2.2. Mutation Interface Standard

All mutations must follow this interface:

```typescript
interface ProtocolMutation {
  type: ProtocolMutationType;
  params?: Record<string, any>;
  description?: string;
}
```

### 2.3. Required Implementation Standards

| Mutation Type | Required Implementation | Parameters |
|---------------|------------------------|------------|
| **ENCRYPTION** | AES-256-CBC with IV | `algorithm`, `password` |
| **COMPRESSION** | Support for Gzip, Deflate, Brotli | `algorithm`, `level` |
| **CHUNKING** | Fixed-size chunking with metadata | `chunkSize`, `includeMetadata` |
| **VERSIONING** | Version tracking with CID linking | `version`, `timestamp`, `author`, `previousVersionCid` |
| **METADATA_ENHANCEMENT** | Content-type detection & metadata augmentation | `metadata`, `enhancementType`, `detectContentType` |

## 3. NFT Metadata Standards

### 3.1. Base NFT Metadata Structure

```json
{
  "name": "Asset Name",
  "description": "Asset Description",
  "image": "ipfs://{cid}",
  "attributes": [
    { "trait_type": "Property", "value": "Value" }
  ]
}
```

### 3.2. Extended Media Metadata

For rich media NFTs (videos, 3D models, etc.), include:

```json
{
  "animation_url": "ipfs://{media_cid}",
  "image": "ipfs://{thumbnail_cid}",
  "media": {
    "mimeType": "video/mp4",
    "size": "12345678",
    "duration": "00:01:23",
    "dimensions": "1920x1080"
  }
}
```

### 3.3. Storage Proofs (for Filecoin-stored content)

```json
{
  "storage_proofs": [
    {
      "provider": "filecoin",
      "deal_id": "12345",
      "expiry": 1715080673,
      "miner": "f01234567"
    }
  ]
}
```

## 4. Streaming Media Standards

### 4.1. Quality Levels

| Level | Resolution | Bitrate | Target Use Case |
|-------|------------|---------|----------------|
| LOW | 480p | 500-800 Kbps | Mobile, low bandwidth |
| MEDIUM | 720p | 1.5-3 Mbps | Desktop, moderate bandwidth |
| HIGH | 1080p | 3-6 Mbps | Desktop, high bandwidth |
| ULTRA | 4K | 12-20 Mbps | Premium experience |

### 4.2. Streaming Protocols

- HTTP Live Streaming (HLS) required for adaptive bitrate
- DASH supported as optional alternative
- Progressive download supported for backward compatibility

### 4.3. Manifest Standards

- HLS manifests must include all quality variants
- Segment duration: 4-6 seconds recommended
- CORS headers required on all streaming content

## 5. Security Standards

### 5.1. API Key Management

- Environment variables only for credentials
- API key rotation every 90 days
- Scoped API tokens with minimum permissions
- Separate keys for dev/test/production

### 5.2. Content Security

- Content validation before upload
- File type restrictions
- Metadata schema validation
- Optional content encryption for private data

### 5.3. Error Handling and Monitoring

- Try/catch blocks for all service operations
- Retry mechanisms with exponential backoff
- Circuit breakers for unreliable services
- Structured logging for all operations

## 6. Code and Documentation Standards

### 6.1. TypeScript Standards

- Strong typing for all functions and variables
- ES Module format with `.js` extensions in imports
- Interface definitions for all public APIs
- Comprehensive JSDoc comments

### 6.2. Testing Standards

- Unit tests for all services
- End-to-end tests for integrated workflows
- TypeChain-generated types for contract interactions
- Proper use of Hardhat fixtures for test isolation

### 6.3. Documentation Standards

- README.md for project overview
- TABULATED-REFERENCE.md for feature comparison
- Code comments follow JSDoc format
- Architecture diagrams in Mermaid format

## 7. Environment Configuration Standards

### 7.1. Required Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `PINATA_API_KEY` | Authentication for Pinata API | None |
| `PINATA_API_SECRET` | Authentication for Pinata API | None |
| `WEB3_STORAGE_TOKEN` | Authentication for Web3.Storage | None |
| `IPFS_GATEWAY_URL` | Custom IPFS gateway URL | "https://ipfs.io/ipfs/" |

### 7.2. Configuration Precedence

1. Environment variables
2. Configuration file values
3. Service-specific defaults
4. Global project defaults

## 8. Versioning and Releases

### 8.1. Version Numbering

- Follow Semantic Versioning (SemVer) - MAJOR.MINOR.PATCH
- MAJOR: Breaking changes
- MINOR: New features, backward compatible
- PATCH: Bug fixes, backward compatible

### 8.2. Changelog Standards

- Keep a CHANGELOG.md file
- Group changes by version
- Categories: Added, Changed, Deprecated, Removed, Fixed, Security

## 9. Integration Standards

### 9.1. Smart Contract Integration

- Use ERC-721 or ERC-1155 standards for NFTs
- Store IPFS CIDs using the `ipfs://` URI scheme
- Implement metadata URI resolution through getters
- Include OpenZeppelin security features

### 9.2. Service Integration

- Initialize all services before use
- Handle service unavailability gracefully
- Implement proper error propagation
- Document service dependencies

## 10. Future Standards (Planned)

- Multi-chain integration standards
- AI-driven content optimization guidelines
- Decentralized identity integration
- Edge network acceleration protocols

---

This standards document is maintained by the helia-blockchain project team and is subject to periodic updates as the project evolves.

*Last updated: May 20, 2025*
