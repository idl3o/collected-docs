# Protocol Mutation in Helia-Blockchain

This document outlines the protocol mutation functionality implemented in the helia-blockchain project.

## 1. What are Protocol Mutations?

Protocol mutations are transformations applied to content before storing it on decentralized storage networks like IPFS, Filecoin, or Web3.Storage. These transformations enhance the content in various ways, such as:

- **Security**: Adding encryption to protect sensitive content
- **Efficiency**: Applying compression to reduce storage requirements
- **Scalability**: Implementing chunking for large files
- **Versioning**: Adding metadata for content versioning
- **Discoverability**: Enhancing content with additional metadata

## 2. Implementation Overview

Our protocol mutation system is implemented as part of the PinataService but designed to be usable with other storage services. It consists of:

1. **Mutation Types**: Defined enum of possible transformations
2. **Mutation Interface**: Configuration structure for mutations
3. **Processing Methods**: Functions that apply specific mutations
4. **Content Pipeline**: System for applying multiple mutations in sequence

## 3. Mutation Types

```typescript
export enum ProtocolMutationType {
  ENCRYPTION = 'encryption',
  COMPRESSION = 'compression',
  CHUNKING = 'chunking',
  VERSIONING = 'versioning',
  METADATA_ENHANCEMENT = 'metadata-enhancement'
}
```

## 4. Mutation Interface

```typescript
export interface ProtocolMutation {
  type: ProtocolMutationType;
  params?: Record<string, any>;
  description?: string;
}
```

## 5. Mutation Processing Methods

### 5.1 Encryption

The `applyEncryption` method encrypts content using industry-standard encryption algorithms:

```typescript
private async applyEncryption(
  content: Buffer | string,
  params?: Record<string, any>
): Promise<Buffer> {
  // Convert string content to buffer if needed
  const contentBuffer = typeof content === 'string' ? Buffer.from(content) : content;
  
  // Get encryption parameters with defaults
  const algorithm = params?.algorithm || 'aes-256-cbc';
  const password = params?.password || process.env.ENCRYPTION_KEY || 'default-secure-key';
  
  // Generate a key from the password
  const key = crypto.scryptSync(password, 'salt', 32);
  
  // Generate a random initialization vector
  const iv = crypto.randomBytes(16);
  
  // Create cipher
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  
  // Encrypt the content
  const encrypted = Buffer.concat([
    iv,  // Prepend IV to the encrypted content for later decryption
    cipher.update(contentBuffer),
    cipher.final()
  ]);
  
  return encrypted;
}
```

### 5.2 Compression

The `applyCompression` method compresses content using various algorithms:

```typescript
private async applyCompression(
  content: Buffer | string, 
  params?: Record<string, any>
): Promise<Buffer> {
  // Convert string content to buffer if needed
  const contentBuffer = typeof content === 'string' ? Buffer.from(content) : content;
  
  // Get compression algorithm from params or use default
  const algorithm = params?.algorithm || 'gzip';
  const level = params?.level || zlib.constants.Z_BEST_COMPRESSION;
  
  // Apply compression based on the algorithm
  switch (algorithm.toLowerCase()) {
    case 'gzip':
      return await gzipPromise(contentBuffer, { level });
    
    case 'deflate':
      return await deflatePromise(contentBuffer, { level });
    
    case 'brotli':
      return await brotliCompressPromise(contentBuffer, {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: level
        }
      });
    
    default:
      throw new Error(`Unsupported compression algorithm: ${algorithm}`);
  }
}
```

### 5.3 Chunking

The `applyChunking` method splits content into manageable chunks:

```typescript
private async applyChunking(
  content: Buffer | string,
  params?: Record<string, any>
): Promise<Buffer> {
  // Convert string content to buffer if needed
  const contentBuffer = typeof content === 'string' ? Buffer.from(content) : content;
  
  // Get chunking parameters with defaults
  const chunkSize = params?.chunkSize || 262144; // 256KB default chunk size
  const includeMetadata = params?.includeMetadata !== false;
  
  // Calculate number of chunks needed
  const totalSize = contentBuffer.byteLength;
  const chunks: Buffer[] = [];
  const totalChunks = Math.ceil(totalSize / chunkSize);
  
  // Split the content into chunks
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, totalSize);
    chunks.push(contentBuffer.subarray(start, end));
  }
  
  // Create metadata for the chunked content
  const metadata = {
    originalSize: totalSize,
    chunkSize,
    totalChunks,
    chunked: true,
    checksums: chunks.map(chunk => {
      const hash = crypto.createHash('sha256');
      hash.update(chunk);
      return hash.digest('hex');
    })
  };
  
  // If we need to include metadata in the content, we'll prepend it
  if (includeMetadata) {
    const metadataBuffer = Buffer.from(JSON.stringify(metadata));
    const metadataSize = Buffer.alloc(4);
    metadataSize.writeUInt32BE(metadataBuffer.byteLength, 0);
    
    return Buffer.concat([
      metadataSize,           // 4 bytes for metadata size
      metadataBuffer,         // JSON metadata
      chunks[0] || Buffer.alloc(0) // First chunk or empty buffer
    ]);
  }
  
  // Return just the first chunk if metadata is not included
  return chunks[0] || Buffer.alloc(0);
}
```

### 5.4 Versioning

The `applyVersioning` method adds versioning information to content:

```typescript
private async applyVersioning(
  content: Buffer | string,
  params?: Record<string, any>
): Promise<Buffer> {
  // Convert string content to buffer if needed
  const contentBuffer = typeof content === 'string' ? Buffer.from(content) : content;
  
  // Get versioning parameters
  const version = params?.version || '1.0.0';
  const timestamp = params?.timestamp || new Date().toISOString();
  const author = params?.author || 'unknown';
  const previousVersionCid = params?.previousVersionCid || null;
  
  // Create versioning metadata
  const versionMetadata = {
    version,
    timestamp,
    author,
    previousVersionCid,
    contentType: params?.contentType || 'application/octet-stream',
    contentHash: crypto.createHash('sha256').update(contentBuffer).digest('hex')
  };
  
  // Serialize the metadata
  const metadataBuffer = Buffer.from(JSON.stringify(versionMetadata));
  const metadataSize = Buffer.alloc(4);
  metadataSize.writeUInt32BE(metadataBuffer.length, 0);
  
  // Combine metadata with content
  return Buffer.concat([
    metadataSize,      // 4 bytes for metadata size
    metadataBuffer,    // JSON metadata
    contentBuffer      // Original content
  ]);
}
```

### 5.5 Metadata Enhancement

The `applyMetadataEnhancement` method adds additional metadata to content:

```typescript
private async applyMetadataEnhancement(
  content: Buffer | string,
  params?: Record<string, any>
): Promise<Buffer> {
  // Convert string content to buffer if needed
  const contentBuffer = typeof content === 'string' ? Buffer.from(content) : content;
  
  // Get metadata enhancement parameters
  const enhancementType = params?.enhancementType || 'general';
  const customMetadata = params?.metadata || {};
  
  // Generate some basic metadata
  const generatedMetadata: Record<string, any> = {
    timestamp: new Date().toISOString(),
    enhancementType,
    contentSize: contentBuffer.byteLength,
    contentHash: crypto.createHash('sha256').update(contentBuffer).digest('hex')
  };
  
  // Add mime type detection based on content analysis if available
  if (params?.detectContentType !== false) {
    if (contentBuffer.length > 2) {
      const header = contentBuffer.subarray(0, 4);
      
      // Check for common file signatures (magic numbers)
      if (header[0] === 0xFF && header[1] === 0xD8 && header[2] === 0xFF) {
        generatedMetadata.detectedContentType = 'image/jpeg';
      } else if (header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47) {
        generatedMetadata.detectedContentType = 'image/png';
      } else if (header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46) {
        generatedMetadata.detectedContentType = 'image/gif';
      } else if (header[0] === 0x25 && header[1] === 0x50 && header[2] === 0x44 && header[3] === 0x46) {
        generatedMetadata.detectedContentType = 'application/pdf';
      }
    }
  }
  
  // Combine generated metadata with custom metadata
  const fullMetadata = {
    ...generatedMetadata,
    ...customMetadata
  };
  
  // Serialize the metadata
  const metadataBuffer = Buffer.from(JSON.stringify(fullMetadata));
  const metadataSize = Buffer.alloc(4);
  metadataSize.writeUInt32BE(metadataBuffer.length, 0);
  
  // Combine metadata with content
  return Buffer.concat([
    metadataSize,      // 4 bytes for metadata size
    metadataBuffer,    // JSON metadata
    contentBuffer      // Original content
  ]);
}
```

## 6. Process Protocol Mutation Method

The core of the protocol mutation system is the `processProtocolMutation` method:

```typescript
async processProtocolMutation(
  content: Buffer | string, 
  mutations: ProtocolMutation[],
  contentType: FileType = FileType.OTHER
): Promise<{ 
  processedContent: Buffer | string; 
  appliedMutations: ProtocolMutation[];
  metadata: Record<string, any>;
}> {
  let processedContent = content;
  const appliedMutations: ProtocolMutation[] = [];
  const metadata: Record<string, any> = {
    contentType,
    originalSize: typeof content === 'string' ? content.length : content.byteLength,
    mutations: []
  };
  
  console.log(`Applying ${mutations.length} protocol mutations to content`);
  
  for (const mutation of mutations) {
    try {
      console.log(`Applying mutation: ${mutation.type}`);
      
      switch (mutation.type) {
        case ProtocolMutationType.ENCRYPTION:
          processedContent = await this.applyEncryption(processedContent, mutation.params);
          appliedMutations.push(mutation);
          metadata.mutations.push({
            type: mutation.type,
            description: mutation.description || 'Content encrypted',
            timestamp: new Date().toISOString()
          });
          break;
          
        case ProtocolMutationType.COMPRESSION:
          processedContent = await this.applyCompression(processedContent, mutation.params);
          appliedMutations.push(mutation);
          metadata.mutations.push({
            type: mutation.type,
            description: mutation.description || 'Content compressed',
            algorithm: mutation.params?.algorithm || 'gzip',
            timestamp: new Date().toISOString()
          });
          break;
          
        case ProtocolMutationType.CHUNKING:
          processedContent = await this.applyChunking(processedContent, mutation.params);
          appliedMutations.push(mutation);
          metadata.mutations.push({
            type: mutation.type,
            description: mutation.description || 'Content chunked',
            chunkSize: mutation.params?.chunkSize || 'default',
            timestamp: new Date().toISOString()
          });
          break;
          
        case ProtocolMutationType.VERSIONING:
          processedContent = await this.applyVersioning(processedContent, mutation.params);
          appliedMutations.push(mutation);
          metadata.mutations.push({
            type: mutation.type,
            description: mutation.description || 'Content versioned',
            version: mutation.params?.version || '1.0.0',
            timestamp: new Date().toISOString()
          });
          break;
          
        case ProtocolMutationType.METADATA_ENHANCEMENT:
          processedContent = await this.applyMetadataEnhancement(processedContent, mutation.params);
          appliedMutations.push(mutation);
          metadata.mutations.push({
            type: mutation.type,
            description: mutation.description || 'Metadata enhanced',
            enhancementType: mutation.params?.enhancementType || 'general',
            timestamp: new Date().toISOString()
          });
          break;
          
        default:
          console.warn(`Unknown mutation type: ${mutation.type}`);
      }
    } catch (error) {
      console.error(`Error applying mutation ${mutation.type}:`, error);
      metadata.mutations.push({
        type: mutation.type,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
  }
  
  metadata.finalSize = typeof processedContent === 'string' ? 
    processedContent.length : 
    processedContent instanceof Buffer ? 
      processedContent.byteLength : 
      0;
  
  metadata.compressionRatio = metadata.originalSize > 0 ? 
    (metadata.finalSize / metadata.originalSize).toFixed(2) : 
    1;
  
  return { 
    processedContent, 
    appliedMutations,
    metadata
  };
}
```

## 7. Usage Examples

### Simple Encryption and Compression

```typescript
const pinataService = new PinataService();
await pinataService.initialize();

const mutations = [
  {
    type: ProtocolMutationType.COMPRESSION,
    params: { algorithm: 'brotli', level: 11 },
    description: 'High compression with Brotli'
  },
  {
    type: ProtocolMutationType.ENCRYPTION,
    params: { algorithm: 'aes-256-cbc' },
    description: 'AES encryption for security'
  }
];

const fileContent = fs.readFileSync('path/to/file.txt');
const result = await pinataService.processProtocolMutation(fileContent, mutations, FileType.OTHER);

console.log(`Original size: ${result.metadata.originalSize} bytes`);
console.log(`Final size: ${result.metadata.finalSize} bytes`);
console.log(`Compression ratio: ${result.metadata.compressionRatio}`);
```

### Content Versioning

```typescript
// First version
const content = "Initial content";
const versionMutation = [{
  type: ProtocolMutationType.VERSIONING,
  params: {
    version: '1.0.0',
    author: 'user@example.com'
  }
}];

const v1Result = await pinataService.processProtocolMutation(content, versionMutation);
const v1Cid = await pinataService.pinBufferToIPFS(v1Result.processedContent);

// Second version
const updatedContent = "Updated content with new information";
const v2VersionMutation = [{
  type: ProtocolMutationType.VERSIONING,
  params: {
    version: '1.0.1',
    author: 'user@example.com',
    previousVersionCid: v1Cid
  }
}];

const v2Result = await pinataService.processProtocolMutation(
  updatedContent, 
  v2VersionMutation
);
const v2Cid = await pinataService.pinBufferToIPFS(v2Result.processedContent);
```

### Complex Pipeline

```typescript
const mutations = [
  {
    type: ProtocolMutationType.METADATA_ENHANCEMENT,
    params: {
      metadata: {
        title: "Important Document",
        author: "John Smith",
        tags: ["confidential", "finance", "report"]
      }
    }
  },
  {
    type: ProtocolMutationType.COMPRESSION,
    params: { algorithm: 'gzip', level: 9 }
  },
  {
    type: ProtocolMutationType.ENCRYPTION,
    params: { algorithm: 'aes-256-cbc' }
  },
  {
    type: ProtocolMutationType.VERSIONING,
    params: { version: '1.0.0' }
  }
];

const content = fs.readFileSync('path/to/file.pdf');
const result = await pinataService.processProtocolMutation(
  content, 
  mutations,
  FileType.PDF
);

const cid = await pinataService.pinBufferToIPFS(
  result.processedContent,
  'secure-document.pdf',
  FileType.PDF
);
```

## 8. Future Enhancements

1. **Reversible Mutations**: Add methods to reverse mutations (decrypt, decompress)
2. **Custom Mutation Types**: Allow users to define and register custom mutations
3. **Mutation Pipelines**: Define standard mutation pipelines for common use cases
4. **Metadata Extraction**: Extract metadata from common file formats
5. **Content Transformation**: Add mutations for content transformation (resize images, transcode video)
6. **Integration with Decentralized Identity**: Add verifiable credentials to content

---

This document provides a comprehensive overview of the protocol mutation functionality in the helia-blockchain project.
