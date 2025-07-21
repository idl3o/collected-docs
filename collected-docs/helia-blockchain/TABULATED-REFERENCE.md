# Helia-Blockchain Tabulated Reference

This document provides tabular representations of the key components, features, and comparisons in the Helia-Blockchain project.

## Storage Services Overview

| Service | Base Technology | Persistence | Best Use Case | Implementation Complexity |
|---------|----------------|-------------|---------------|---------------------------|
| **IPFSService** | Helia IPFS | Temporary (in-memory) | Development, testing, small files | Simple |
| **PinataService** | Helia IPFS + Pinata API | Semi-permanent (centralized) | NFT images, collection metadata | Moderate |
| **FilecoinService** | Helia IPFS + Filecoin | Long-term (decentralized) | Video NFTs, premium content | Advanced |
| **Web3StorageService** | Helia IPFS + Web3.Storage | Long-term (decentralized) | Large files, archival data | Moderate |
| **FilecoinEcosystemService** | Filecoin + Streaming | Ecosystem integration | High-value content, streaming | Advanced |

## Service Feature Comparison

| Feature | IPFSService | PinataService | FilecoinService | Web3StorageService | FilecoinEcosystemService |
|---------|------------|--------------|----------------|-------------------|--------------------------|
| **Storage Type** | Content-addressed, local | Content-addressed, pinned | Content-addressed with deals | Content-addressed with Web3 | Complete ecosystem |
| **Persistence** | Temporary (memory) | Semi-permanent (centralized) | Long-term (decentralized) | Long-term (decentralized) | Long-term + streaming |
| **Recovery** | None | Service-based | Cryptographic proofs | Service-based proofs | Advanced recovery options |
| **Best For** | Development, testing | Standard NFTs, images | Premium NFTs, videos | Large files, archives | Streaming content |
| **Specialized For** | JSON metadata, small files | Images, collection management | Videos, archival content | Large datasets | Streaming media, ecosystem |
| **Cost** | Free | Service subscription | Pay per storage deal | Free tier + paid options | Comprehensive ecosystem |
| **Implementation** | Simple | Moderate | Advanced | Moderate | Advanced |
| **NFT Metadata** | Basic | Enhanced with gateway URLs | Comprehensive with deal information | Enhanced with W3 capabilities | Full ecosystem integration |
| **Gateway Support** | Basic | Multiple CDN options | Multiple retrieval paths | Reliable gateways | Streaming optimized |
| **Storage Proof** | None | API-based confirmation | Cryptographic verification | W3 proofs | Complete ecosystem proofs |
| **Protocol Mutations** | None | Advanced transformations | Limited | Limited | Full support |
| **Streaming Support** | None | None | Basic | None | Advanced adaptive streaming |

## File Types and Storage Recommendations

| File Type | Size | Importance | Recommended Service | Rationale |
|-----------|------|------------|---------------------|-----------|
| **JSON Metadata** | Small (<10KB) | High | PinataService | Needs persistence but doesn't justify Filecoin costs |
| **NFT Images** | Medium (10KB-5MB) | High | PinataService | Needs reliable access and persistence |
| **Thumbnails** | Small (<50KB) | Medium | PinataService | Needs fast retrieval and decent persistence |
| **Videos - Standard** | Large (5MB-100MB) | Medium | PinataService | Balance between cost and persistence |
| **Videos - Premium** | Large (5MB-1GB+) | High | FilecoinService | Needs guaranteed long-term storage |
| **Archival Content** | Very Large (1GB+) | High | FilecoinService | Cost-effective for long-term storage |
| **Development Assets** | Any | Low | IPFSService | Temporary storage is sufficient |

## API Reference

### IPFSService

| Method | Description | Parameters | Return Value |
|--------|-------------|------------|-------------|
| `initialize()` | Initializes the IPFS service | None | Promise<void> |
| `addText(text)` | Adds text to IPFS | text: string | Promise<CID> |
| `getText(cid)` | Gets text from IPFS | cid: CID | Promise<string> |
| `addJson(json)` | Adds JSON to IPFS | json: object | Promise<CID> |
| `getJson(cid)` | Gets JSON from IPFS | cid: CID | Promise<object> |
| `addFile(path)` | Adds a file to IPFS | path: string | Promise<CID> |
| `getGatewayUrl(cid)` | Gets gateway URL for CID | cid: CID | string |

### PinataService (extends IPFSService)

| Method | Description | Parameters | Return Value |
|--------|-------------|------------|-------------|
| `initialize()` | Initializes the Pinata service | None | Promise<void> |
| `pinCid(cid)` | Pins a CID to Pinata | cid: CID | Promise<PinResponse> |
| `pinFile(path, type)` | Pins a file to Pinata | path: string, type: FileType | Promise<PinResponse> |
| `unpinCid(cid)` | Unpins a CID from Pinata | cid: CID | Promise<boolean> |
| `getGatewayUrl(cid)` | Gets enhanced gateway URL | cid: CID | string |
| `addFile(path, type)` | Adds and pins file | path: string, type: FileType | Promise<CID> |

### FilecoinService (extends IPFSService)

| Method | Description | Parameters | Return Value |
|--------|-------------|------------|-------------|
| `initialize()` | Initializes Filecoin service | None | Promise<void> |
| `storeFile(path, options)` | Stores file with deal | path: string, options: StorageOptions | Promise<StorageResponse> |
| `storeVideoNFT(path, name, desc, quality, options)` | Stores video as NFT | Multiple parameters | Promise<StorageResponse> |
| `checkDealStatus(cid)` | Checks Filecoin deal status | cid: CID | Promise<DealStatus> |
| `getGatewayUrl(cid)` | Gets gateway URL with backups | cid: CID | string |

### Web3StorageService (extends IPFSService)

| Method | Description | Parameters | Return Value |
|--------|-------------|------------|-------------|
| `initialize()` | Initializes Web3Storage service | None | Promise<void> |
| `uploadFile(filePath, options)` | Uploads a file to Web3Storage | path: string, options: Web3StorageOptions | Promise<string> (CID) |
| `uploadDirectory(dirPath, options)` | Uploads a directory to Web3Storage | path: string, options: Web3StorageOptions | Promise<string> (CID) |
| `uploadContent(content, options)` | Uploads raw content to Web3Storage | content: Buffer, options: Web3StorageOptions | Promise<string> (CID) |
| `getStatus(cid)` | Gets status of content by CID | cid: string | Promise<StatusInfo> |
| `getGatewayUrl(cid)` | Gets Web3Storage gateway URL | cid: string | string |

### FilecoinEcosystemService (extends IPFSService)

| Method | Description | Parameters | Return Value |
|--------|-------------|------------|-------------|
| `initialize()` | Initializes the ecosystem service | None | Promise<void> |
| `registerParticipant(address, role, name)` | Registers ecosystem participant | address: string, role: string, name?: string | Promise<FilecoinParticipant> |
| `createContentStream(cid, options)` | Creates a stream for content | cid: string, options: StreamingOptions | Promise<string> (sessionId) |
| `getStreamSession(sessionId)` | Gets streaming session info | sessionId: string | StreamSession or null |
| `getStreamChunk(sessionId, chunkIndex)` | Gets a specific stream chunk | sessionId: string, chunkIndex: number | Promise<Buffer or null> |
| `closeStreamSession(sessionId)` | Closes a streaming session | sessionId: string | boolean |

## Demo Scripts Reference

| Script | Purpose | Features Demonstrated |
|--------|---------|----------------------|
| `src/index.ts` | Main demo | Basic IPFS and Filecoin integration |
| `src/scripts/filecoinDemo.ts` | Filecoin-focused demo | Video NFT storage with Filecoin deals |
| `src/scripts/serviceComparisonDemo.ts` | Service comparison | Side-by-side comparison of all services |
| `src/scripts/integratedStorageDemo.ts` | Integrated storage | Multi-tier storage approach |
| `src/scripts/benchmarkStorageServices.ts` | Performance benchmark | Performance metrics for all services |
| `src/scripts/deployAndMintNFT.ts` | Smart contract demo | Contract deployment and NFT minting |

## Environment Variables

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `PINATA_API_KEY` | No | None | Authentication for Pinata API |
| `PINATA_API_SECRET` | No | None | Authentication for Pinata API |
| `PINATA_JWT` | No | None | Alternative authentication for Pinata API |
| `WEB3_STORAGE_TOKEN` | No | None | Authentication for Web3.Storage/Filecoin |
| `IPFS_GATEWAY_URL` | No | "https://ipfs.io/ipfs/" | Custom IPFS gateway URL |
| `SIMULATION_MODE` | No | "false" | Force simulation mode for all services |

## NPM Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `build` | `tsc` | Transpile TypeScript code |
| `start` | `node dist/index.js` | Run the compiled application |
| `dev` | `nodemon --watch src --ext ts --exec ts-node src/index.ts` | Run with hot reload |
| `test` | `npx cross-env NODE_OPTIONS="--loader ts-node/esm" hardhat test` | Run all tests |
| `demo:filecoin` | `npx cross-env NODE_OPTIONS="--loader ts-node/esm" ts-node src/scripts/filecoinDemo.ts` | Run Filecoin demo |
| `demo:comparison` | `npx cross-env NODE_OPTIONS="--loader ts-node/esm" ts-node src/scripts/serviceComparisonDemo.ts` | Run comparison demo |
| `demo:integrated` | `npx cross-env NODE_OPTIONS="--loader ts-node/esm" ts-node src/scripts/integratedStorageDemo.ts` | Run integrated demo |
| `demo:benchmark` | `npx cross-env NODE_OPTIONS="--loader ts-node/esm" ts-node src/scripts/benchmarkStorageServices.ts` | Run benchmark tests |
| `webapp` | `npx cross-env NODE_OPTIONS="--loader ts-node/esm" node webapp/index.js` | Start the web application |
| `docs:diagram` | `npx mmdc -i docs/architecture-diagram.md -o docs/architecture-diagram.png` | Generate architecture diagram |

## Integration Decision Flowchart (Textual)

1. **What type of content are you storing?**
   - Metadata → Go to 2
   - Images → Go to 3
   - Videos → Go to 4
   - Other files → Go to 5

2. **Metadata**
   - Development phase → IPFSService
   - Production, standard NFT → PinataService
   - Production, premium NFT → PinataService + FilecoinService for backups

3. **Images**
   - Development phase → IPFSService
   - Production, standard images → PinataService
   - Production, premium/archival → PinataService + FilecoinService backup

4. **Videos**
   - Development/testing → IPFSService
   - Standard quality requirements → PinataService
   - Premium content / Long-term storage needs → FilecoinService

5. **Other files**
   - Development/testing → IPFSService
   - Small, frequently accessed → PinataService
   - Large, archival importance → FilecoinService

## Technical Architecture

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Smart Contracts** | Solidity, OpenZeppelin | NFT functionality and IPFS integration |
| **IPFS Storage** | Helia, js-ipfs | Content-addressed storage base layer |
| **Pinning Service** | Pinata API | Enhanced persistence and pinning |
| **Filecoin Integration** | Web3.Storage | Long-term decentralized storage |
| **Development & Testing** | Hardhat, TypeScript | Development frameworks |
| **Web Interface** | Express.js | Demo web application |

## Roadmap Status

| Feature | Status | Notes |
|---------|--------|-------|
| IPFSService Implementation | ✅ Complete | Fully functional with Helia |
| PinataService Implementation | ✅ Complete | Fully functional with Pinata API |
| FilecoinService Implementation | ✅ Complete | Functional with Web3.Storage |
| Web3StorageService Implementation | ✅ Complete | Direct integration with Web3.Storage |
| FilecoinEcosystemService | ✅ Complete | Enhanced Filecoin ecosystem integration |
| Protocol Mutations | ✅ Complete | Full transformation pipeline with 5 mutation types |
| Streaming Capabilities | ✅ Complete | Adaptive streaming with quality levels |
| Ecosystem Participant Management | ✅ Complete | Support for different ecosystem roles |
| NFT Contract | ✅ Complete | Implemented with ERC721 standard |
| Documentation | ✅ Complete | Comprehensive documentation available |
| Demo Scripts | ✅ Complete | Multiple demo scripts available |
| Web Interface | ✅ Complete | Basic web interface implemented |
| React UI Components | ✅ Complete | Modern React interface for ecosystem |
| Benchmark Tools | ✅ Complete | Performance benchmarking available |
| Architecture Diagrams | ✅ Complete | Visual architecture documentation |
| Cost Optimization | ✅ Complete | Guidelines and optimization implemented |
| Production Security Guide | ✅ Complete | Security documentation available |
| Advanced Monitoring | 🔄 In Progress | Enhanced monitoring capabilities |
| Ecosystem Analytics | 🔄 In Progress | Data analysis for ecosystem activities |
| Multi-chain Integration | 📝 Planned | Support for additional blockchains |
| AI-driven Content Optimization | 📝 Planned | Smart content transformation and storage |
| Decentralized Identity | 📝 Planned | Integration with DIDs for authentication |
| Edge Network Acceleration | 📝 Planned | Improved streaming via edge computing |

## Protocol Mutations

| Mutation Type | Purpose | Use Cases | Complexity | Implementation |
|---------------|---------|-----------|------------|----------------|
| **ENCRYPTION** | Secure content with encryption | Sensitive data, paywalled content | Moderate | AES-256-CBC with IV |
| **COMPRESSION** | Reduce size of content | Large files, bandwidth optimization | Low | Gzip, Deflate, Brotli |
| **CHUNKING** | Split content into manageable chunks | Large files, streaming | Moderate | Fixed-size chunking with metadata |
| **VERSIONING** | Track content versions | Collaborative content, history | Low | Embedded version metadata |
| **METADATA_ENHANCEMENT** | Add rich metadata to content | Content description, searchability | Low | JSON metadata prepending |

### Protocol Mutation Parameters

| Mutation | Parameter | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| **ENCRYPTION** | `algorithm` | string | 'aes-256-cbc' | Encryption algorithm to use |
| **ENCRYPTION** | `password` | string | env var or default | Encryption key/password |
| **COMPRESSION** | `algorithm` | string | 'gzip' | Compression algorithm ('gzip', 'deflate', 'brotli') |
| **COMPRESSION** | `level` | number | Z_BEST_COMPRESSION | Compression level |
| **CHUNKING** | `chunkSize` | number | 262144 (256KB) | Size of each chunk in bytes |
| **CHUNKING** | `includeMetadata` | boolean | true | Whether to include chunking metadata |
| **VERSIONING** | `version` | string | '1.0.0' | Version string |
| **VERSIONING** | `author` | string | 'unknown' | Author information |
| **VERSIONING** | `previousVersionCid` | string | null | CID of previous version |
| **METADATA_ENHANCEMENT** | `enhancementType` | string | 'general' | Type of metadata enhancement |
| **METADATA_ENHANCEMENT** | `metadata` | object | {} | Custom metadata to include |
| **METADATA_ENHANCEMENT** | `detectContentType` | boolean | true | Whether to detect content type |

## Web3Storage Integration

| Feature | Description | Benefit | Implementation |
|---------|-------------|---------|----------------|
| **Content Addressing** | CID-based content identification | Verifiable content integrity | IPFS/W3UP CIDs |
| **Decentralized Storage** | Storage across decentralized network | Resilience and availability | Web3.Storage network |
| **Reliability** | Multiple replicas of data | High availability | Automatic replication |
| **Filecoin Integration** | Automatic Filecoin storage | Long-term persistence | Filecoin deals |
| **Simple Auth** | API token-based authentication | Easy integration | W3UP auth system |
| **Direct Uploads** | Direct file and directory uploads | Simplified workflow | W3UP client |

### Web3Storage API Reference

| Method | Description | Parameters | Return Value |
|--------|-------------|------------|-------------|
| `initialize()` | Initializes Web3Storage service | None | Promise<void> |
| `uploadFile(filePath, options)` | Uploads a file to Web3Storage | path: string, options: Web3StorageOptions | Promise<string> (CID) |
| `uploadDirectory(dirPath, options)` | Uploads a directory to Web3Storage | path: string, options: Web3StorageOptions | Promise<string> (CID) |
| `uploadContent(content, options)` | Uploads raw content to Web3Storage | content: Buffer, options: Web3StorageOptions | Promise<string> (CID) |
| `getStatus(cid)` | Gets status of content by CID | cid: string | Promise<StatusInfo> |
| `getGatewayUrl(cid)` | Gets Web3Storage gateway URL | cid: string | string |

## Filecoin Ecosystem and Streaming

### Ecosystem Participants

| Role | Description | Features | Interaction Point |
|------|-------------|----------|-------------------|
| **Client** | Content uploader/consumer | Upload, consumption, deals | Web interface, API |
| **Storage Provider** | Stores content on Filecoin | Storage offers, retrieval | Filecoin network |
| **Retrieval Provider** | Optimizes content retrieval | Fast content delivery | Filecoin retrieval market |
| **Verifier** | Verifies storage proofs | Trust enhancement | Filecoin verification system |

### Streaming Capabilities

| Feature | Description | Implementation | Benefit |
|---------|-------------|----------------|---------|
| **Adaptive Bitrate** | Adjusts quality based on bandwidth | Multiple quality encodings | Smooth playback experience |
| **Chunked Streaming** | Streams content in chunks | Content chunking | Efficient delivery |
| **Session Management** | Manages streaming sessions | Server-side session tracking | Resource optimization |
| **Quality Selection** | User-selectable quality | Multiple encoding profiles | User preference support |
| **Range Requests** | Supports HTTP range requests | Chunk-based delivery | Standard compatibility |
| **Protocol Support** | Multiple streaming protocols | HLS, DASH, Progressive | Wide client support |

### Streaming Quality Levels

| Quality Level | Resolution | Bitrate | Best For |
|---------------|------------|---------|----------|
| **LOW** | 480p | 500-800 Kbps | Mobile, low bandwidth |
| **MEDIUM** | 720p | 1.5-3 Mbps | Desktop, moderate bandwidth |
| **HIGH** | 1080p | 3-6 Mbps | Desktop, high bandwidth |
| **ULTRA** | 4K | 12-20 Mbps | Premium experience |

### FilecoinEcosystemService Methods

| Method | Description | Parameters | Return Value |
|--------|-------------|------------|-------------|
| `initialize()` | Initializes the ecosystem service | None | Promise<void> |
| `registerParticipant(address, role, name)` | Registers ecosystem participant | address: string, role: string, name?: string | Promise<FilecoinParticipant> |
| `createContentStream(cid, options)` | Creates a stream for content | cid: string, options: StreamingOptions | Promise<string> (sessionId) |
| `getStreamSession(sessionId)` | Gets streaming session info | sessionId: string | StreamSession or null |
| `getStreamChunk(sessionId, chunkIndex)` | Gets a specific stream chunk | sessionId: string, chunkIndex: number | Promise<Buffer or null> |
| `closeStreamSession(sessionId)` | Closes a streaming session | sessionId: string | boolean |

## Credits and Acknowledgements

### Core Technologies

| Technology | Purpose | License | Website |
|------------|---------|---------|---------|
| **Helia** | Core IPFS implementation | Apache-2.0 or MIT | [helia.io](https://helia.io) |
| **Hardhat** | Ethereum development environment | MIT | [hardhat.org](https://hardhat.org) |
| **TypeScript** | Type-safe JavaScript | Apache-2.0 | [typescriptlang.org](https://www.typescriptlang.org) |
| **Express.js** | Web application framework | MIT | [expressjs.com](https://expressjs.com) |
| **Node.js** | JavaScript runtime | MIT | [nodejs.org](https://nodejs.org) |
| **React** | UI library for web interfaces | MIT | [reactjs.org](https://reactjs.org) |

### Blockchain and Storage Libraries

| Library | Purpose | License | Organization |
|---------|---------|---------|-------------|
| **@helia/interface** | Helia interface specifications | Apache-2.0 or MIT | Protocol Labs |
| **@helia/json** | JSON handling for Helia | Apache-2.0 or MIT | Protocol Labs |
| **@helia/unixfs** | UNIX filesystem for IPFS | Apache-2.0 or MIT | Protocol Labs |
| **@web3-storage/w3up-client** | Web3.Storage client | Apache-2.0 | Protocol Labs |
| **@web3-storage/upload-client** | Upload client for Web3.Storage | Apache-2.0 | Protocol Labs |
| **@web3-storage/filecoin-client** | Filecoin integration client | Apache-2.0 | Protocol Labs |
| **@ipld/car** | Content-addressable archives | Apache-2.0 | Protocol Labs |
| **blockstore-core** | Block storage utilities | MIT | Protocol Labs |
| **datastore-core** | Data storage utilities | MIT | Protocol Labs |
| **@openzeppelin/contracts** | Secure smart contract implementations | MIT | OpenZeppelin |

### Development and Testing Tools

| Tool | Purpose | License | Organization |
|------|---------|---------|-------------|
| **@nomicfoundation/hardhat-toolbox** | Hardhat plugin collection | MIT | Nomic Foundation |
| **@nomicfoundation/hardhat-chai-matchers** | Chai matchers for Hardhat | MIT | Nomic Foundation |
| **@typechain/hardhat** | TypeScript bindings for contracts | MIT | TypeChain |
| **nodemon** | Auto-restart for development | MIT | Remy Sharp |
| **ts-node** | TypeScript execution environment | MIT | TypeStrong |
| **cross-env** | Cross-platform environment variables | MIT | Kent C. Dodds |
| **@mermaid-js/mermaid-cli** | Diagrams as code | MIT | Mermaid |

### Third-Party Services

| Service | Purpose | Service Type |
|---------|---------|-------------|
| **Pinata** | IPFS pinning service | Commercial API |
| **Web3.Storage** | Decentralized storage service | Protocol Labs |
| **IPFS Public Gateways** | Content delivery | Community/Open |
| **Filecoin Network** | Decentralized storage network | Blockchain/Crypto |

### Dependencies and Utilities

| Library | Purpose | License |
|---------|---------|---------|
| **axios** | HTTP client | MIT |
| **dotenv** | Environment variable management | BSD-2-Clause |
| **form-data** | Form data encoding | MIT |
| **multer** | Multipart form handling | MIT |
| **multiformats** | Self-describing data formats | MIT |
| **zlib** | Compression | MIT |
| **crypto** | Cryptography | MIT |
| **ipfs-car** | Content archive manipulation | Apache-2.0 |
