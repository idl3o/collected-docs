# Web3.Storage Integration for Helia-Blockchain

This document outlines the integration of Web3.Storage with the helia-blockchain project for enhanced decentralized storage capabilities.

## 1. Why Web3.Storage

Web3.Storage provides several advantages as a storage solution:

- **IPFS + Filecoin Integration**: Content is stored on IPFS and backed by Filecoin for long-term persistence
- **Simple API**: Easy-to-use API with modern JavaScript support
- **Free Tier**: Generous free storage allowance for development
- **Content Addressing**: Native CID-based content addressing compatible with our architecture
- **W3Up**: Modern authentication flow with capability-based security
- **High Performance**: Fast retrieval through a global CDN

## 2. Implementation Overview

Our Web3.Storage implementation follows a similar pattern to our other services:

1. **Base Layer**: `IPFSService` for fundamental IPFS operations
2. **Enhancement Layer**: `Web3StorageService` extending IPFSService with Web3.Storage capabilities
3. **Integration**: Combined with our protocol mutation functionality for enhanced storage options

## 3. Key Components

### Web3StorageService

The `Web3StorageService` class extends our `IPFSService` class and adds:

- Authentication with Web3.Storage (W3Up client)
- File and directory uploads to Web3.Storage
- CAR file uploads for more efficient storage
- Content retrieval through the Web3.Storage gateway

### Web3Storage Options

```typescript
export interface Web3StorageOptions {
  name?: string;
  description?: string;
  tags?: string[];
  uploadWithoutDirectory?: boolean;
}
```

### Protocol Mutation Integration

Web3.Storage integrates with our protocol mutation functionality to allow for:

- Encryption before storage
- Compression for more efficient storage
- Chunking of large files
- Versioning support
- Metadata enhancement

## 4. Authentication Flow

Web3.Storage uses a capability-based authentication system:

1. Create a Web3.Storage account
2. Generate a space for your application
3. Store the account ID and space DID in environment variables
4. Generate proof DIDs for authentication
5. Initialize the Web3StorageService with these credentials

## 5. Usage Examples

### Basic Usage

```typescript
// Initialize the service
const web3Storage = new Web3StorageService();
await web3Storage.initialize();

// Upload a file
const response = await web3Storage.uploadFile('path/to/file.jpg');
console.log(`File stored with CID: ${response.cid}`);
console.log(`Retrieval URL: ${response.retrievalUrl}`);
```

### Upload with Protocol Mutations

```typescript
// Initialize services
const web3Storage = new Web3StorageService();
const pinataService = new PinataService(); // For protocol mutations
await web3Storage.initialize();
await pinataService.initialize();

// Define mutations
const mutations = [
  {
    type: ProtocolMutationType.ENCRYPTION,
    params: { algorithm: 'aes-256-cbc' },
    description: 'Encrypt data for secure storage'
  },
  {
    type: ProtocolMutationType.COMPRESSION,
    params: { algorithm: 'brotli', level: 11 },
    description: 'Compress with Brotli at high level'
  }
];

// Read file and apply mutations
const content = fs.readFileSync('path/to/file.txt');
const { processedContent } = await pinataService.processProtocolMutation(
  content,
  mutations,
  FileType.OTHER
);

// Upload the processed content
const result = await web3Storage.uploadContent(
  processedContent,
  {
    name: 'transformed-file.txt',
    description: 'File with applied protocol mutations'
  }
);
```

## 6. Configuration

The Web3.Storage integration requires the following environment variables:

```
WEB3_STORAGE_ACCOUNT_ID=your_account_id
WEB3_STORAGE_SPACE_DID=your_space_did
WEB3_STORAGE_PROOF_DID=your_proof_did
WEB3_STORAGE_PRINCIPAL=your_principal
WEB3_STORAGE_PROOF=your_proof
```

## 7. Future Enhancements

- Integration with Web3.Storage's upload client for more efficient uploads
- Support for Space and File management through the API
- Implementation of access control and sharing features
- UCANs (User Controlled Authorization Networks) for delegated uploads
- Integration with upload verification and data health checking
