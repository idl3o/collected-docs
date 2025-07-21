# Helia-Blockchain Project Rebuild Prompt

This document provides a comprehensive guide for rebuilding the Helia-blockchain project with all its features, including protocol mutation functionality and Web3.Storage integration.

## Project Overview

Helia-blockchain is a Node.js/TypeScript project that combines Helia IPFS functionality with blockchain technologies. The project uses ES modules throughout and includes services for:

1. IPFS content storage and retrieval
2. Pinata integration for pinning IPFS content
3. Filecoin integration for permanent storage
4. Web3.Storage integration as an alternative storage provider
5. Protocol mutation functionality for content transformation

## Project Configuration

### Package.json

```json
{
  "name": "helia-blockchain",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "nodemon --watch src --ext ts --exec ts-node src/index.ts",
    "test": "npx cross-env NODE_OPTIONS=\"--loader ts-node/esm\" hardhat test",
    "demo:filecoin": "npx cross-env NODE_OPTIONS=\"--loader ts-node/esm\" ts-node src/scripts/filecoinDemo.ts",
    "demo:comparison": "npx cross-env NODE_OPTIONS=\"--loader ts-node/esm\" ts-node src/scripts/serviceComparisonDemo.ts",
    "demo:integrated": "npx cross-env NODE_OPTIONS=\"--loader ts-node/esm\" ts-node src/scripts/integratedStorageDemo.ts",
    "webapp": "npx cross-env NODE_OPTIONS=\"--loader ts-node/esm\" node webapp/index.js"
  },
  "dependencies": {
    "@helia/interface": "^5.2.1",
    "@helia/json": "^4.0.5",
    "@helia/unixfs": "^5.0.0",
    "@ipld/car": "^5.4.1",
    "@ucanto/principal": "^9.0.2",
    "@web3-storage/filecoin-client": "^3.3.5",
    "@web3-storage/upload-client": "^17.1.4",
    "@web3-storage/w3up-client": "^17.2.0",
    "axios": "^1.9.0",
    "blockstore-core": "^5.0.2",
    "datastore-core": "^10.0.2",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "form-data": "^4.0.2",
    "helia": "^5.3.0",
    "ipfs-car": "^3.0.0",
    "multer": "^1.4.5-lts.2",
    "multiformats": "^13.3.3"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^5.0.0",
    "@openzeppelin/contracts": "^5.3.0",
    "@typechain/hardhat": "^9.1.0",
    "@types/mocha": "^10.0.10",
    "cross-env": "^7.0.3", 
    "hardhat": "^2.24.0",
    "nodemon": "^3.1.10",
    "ts-node": "^10.9.2",
    "typescript": "^5.8.3"
  }
}
```

### TSConfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

## Environment Variables

Create a `.env` file with the following variables:

```
# IPFS Configuration
IPFS_GATEWAY_URL=https://ipfs.io/ipfs/

# Pinata Configuration
PINATA_API_KEY=your_pinata_api_key
PINATA_API_SECRET=your_pinata_api_secret
PINATA_JWT=your_pinata_jwt

# Web3.Storage Configuration
WEB3_STORAGE_ACCOUNT_ID=your_account_id
WEB3_STORAGE_SPACE_DID=your_space_did
WEB3_STORAGE_PROOF_DID=your_proof_did
WEB3_STORAGE_PRINCIPAL=your_principal
WEB3_STORAGE_PROOF=your_proof

# Security Configuration for Protocol Mutations
ENCRYPTION_KEY=your_secure_encryption_key
```

## Core Services Implementation

### 1. IPFSService (Base Service)

The base service that handles fundamental IPFS operations through Helia.

### 2. PinataService with Protocol Mutation

The PinataService extends the IPFSService and adds:
- Pinning functionality through Pinata API
- Protocol mutation capabilities for content transformation

#### Protocol Mutation Types

```typescript
/**
 * Protocol mutation types for content transformation
 */
export enum ProtocolMutationType {
  ENCRYPTION = 'encryption',
  COMPRESSION = 'compression',
  CHUNKING = 'chunking',
  VERSIONING = 'versioning',
  METADATA_ENHANCEMENT = 'metadata-enhancement'
}

/**
 * Interface for protocol mutation configuration
 */
export interface ProtocolMutation {
  type: ProtocolMutationType;
  params?: Record<string, any>;
  description?: string;
}
```

The PinataService has specific methods for each mutation type:

1. `applyEncryption` - Encrypts content with AES-256-CBC
2. `applyCompression` - Compresses content using GZIP, Deflate, or Brotli
3. `applyChunking` - Chunks large files for distributed storage
4. `applyVersioning` - Adds versioning metadata to content
5. `applyMetadataEnhancement` - Enhances content with additional metadata

The main method for applying mutations is `processProtocolMutation`, which takes:
- Content (Buffer or string)
- Array of mutations to apply
- Content type

### 3. FilecoinService

Extends IPFSService to provide Filecoin integration, particularly for video NFTs:
- Video storage on Filecoin
- Enhanced metadata with Filecoin deal information
- Deal status checking

### 4. Web3StorageService

Extends IPFSService to provide Web3.Storage integration:
- File uploads to Web3.Storage
- Directory uploads
- Direct CAR file uploads
- Status checking and retrieval

## Web App Integration

The project includes an Express.js webapp that provides:
- API endpoints for IPFS operations
- API endpoints for Pinata operations with protocol mutation
- API endpoints for Filecoin operations
- API endpoints for Web3.Storage operations

## React UI

A React UI in the `react-ui` directory provides:
- File upload interface
- Protocol mutation selection
- Storage provider selection (IPFS, Pinata, Filecoin, Web3.Storage)
- Content viewing and retrieval

## Implementation Steps

1. Set up the project structure with ES modules
2. Implement the IPFSService base class
3. Implement the PinataService with protocol mutation
4. Implement the FilecoinService for Filecoin integration
5. Implement the Web3StorageService for Web3.Storage integration
6. Create the Express.js webapp with API endpoints
7. Build the React UI for interaction
8. Create demo scripts for testing

## Usage Examples

### Protocol Mutation with PinataService

```typescript
// Initialize PinataService
const pinataService = new PinataService();
await pinataService.initialize();

// Define mutations
const mutations: ProtocolMutation[] = [
  {
    type: ProtocolMutationType.COMPRESSION,
    params: { algorithm: 'gzip', level: 9 },
    description: 'Compress with GZIP at maximum level'
  },
  {
    type: ProtocolMutationType.ENCRYPTION,
    params: { algorithm: 'aes-256-cbc' },
    description: 'Encrypt with AES-256-CBC'
  }
];

// Process content with mutations
const content = fs.readFileSync('path/to/file.txt');
const { 
  processedContent, 
  appliedMutations,
  metadata 
} = await pinataService.processProtocolMutation(
  content, 
  mutations,
  FileType.OTHER
);

// Pin the processed content
const cid = await pinataService.pinBufferToIPFS(
  processedContent, 
  'transformed-file.txt',
  FileType.OTHER
);
```

### Storing File with Web3.Storage

```typescript
// Initialize Web3StorageService
const web3Storage = new Web3StorageService();
await web3Storage.initialize();

// Upload a file to Web3.Storage
const result = await web3Storage.uploadFile('path/to/file.txt');
console.log(`File stored with CID: ${result.cid}`);
console.log(`Retrieval URL: ${result.retrievalUrl}`);
```

## Extension Ideas

1. Add more protocol mutation types
2. Implement multi-step mutation pipelines
3. Create versioning system using IPFS/Filecoin
4. Build UI for tracking and managing stored content
5. Implement automated deal renewal for Filecoin storage

---

This rebuild prompt provides all the necessary information to recreate the Helia-blockchain project with its key features, including the protocol mutation functionality and Web3.Storage integration.
