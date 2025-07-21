# Filecoin Integration for Video NFT Storage

This document outlines the implementation of Filecoin storage for video NFTs in the helia-blockchain project.

## 1. Why Filecoin for Video NFTs

While IPFS provides content-addressed storage, Filecoin adds the following critical benefits for video NFT storage:

- **Long-term persistence**: Filecoin provides economic incentives for long-term storage
- **Proof of storage**: Cryptographic proofs ensure your data is being stored correctly
- **Retrieval guarantees**: Fast retrieval options for video content
- **Scalability**: Better equipped for large media files like videos
- **Decentralization**: Storage across many independent providers

## 2. Implementation Overview

Our implementation uses a layered approach:

1. **Base Layer**: `IPFSService` for basic IPFS functionality
2. **Enhancement Layer**: `FilecoinService` that extends `IPFSService` for Filecoin integration
3. **Integration**: Enhanced NFT metadata with Filecoin deal information

## 3. Key Components

### FilecoinService

The `FilecoinService` class extends our existing `IPFSService` class and adds:

- Storage of video files on Filecoin network via Web3.Storage
- Creation of enhanced NFT metadata with Filecoin deal information
- Status checking for Filecoin storage deals
- Video-specific optimizations and quality settings

### Enhanced NFT Metadata

The Filecoin NFT metadata format extends standard NFT metadata with:

```json
{
  "name": "Video NFT",
  "description": "Video stored on Filecoin",
  "image": "ipfs://thumbnail-cid",
  "animation_url": "ipfs://video-cid",
  "properties": {
    "files": [
      {
        "uri": "ipfs://thumbnail-cid",
        "type": "image/png",
        "storage": "ipfs"
      },
      {
        "uri": "ipfs://video-cid",
        "type": "video/mp4",
        "storage": "filecoin",
        "dealInfo": {
          "dealId": "deal-id",
          "network": "mainnet"
        }
      }
    ]
  }
}
```

## 4. Usage Examples

### Basic Usage

```typescript
// Initialize service
const filecoinService = new FilecoinService();
await filecoinService.initialize();

// Store video on Filecoin
const videoInfo = await filecoinService.storeVideoOnFilecoin(
  'path/to/video.mp4',
  FilecoinVideoQuality.HIGH
);

// Create NFT metadata with Filecoin storage
const metadataCid = await filecoinService.createFilecoinVideoNftMetadata(
  'Video NFT',
  'Description',
  thumbnailCid,
  videoInfo
);

// Mint NFT with this metadata
// const tx = await nftContract.mintNFT(address, metadataCid);
```

### Checking Deal Status

```typescript
const dealStatus = await filecoinService.checkFilecoinDealStatus(videoCid);
console.log(`Deal status: ${dealStatus.status}`);
```

## 5. Configuration

The Filecoin integration requires API tokens from Web3.Storage. Create a `.env` file with:

```
WEB3_STORAGE_TOKEN=your_token_here
W3_PRINCIPAL_KEY=optional_key_here
```

## 6. Demo Scripts

1. **Basic Demo**: `npx ts-node src/index.ts`
2. **Detailed Filecoin Demo**: `npx ts-node src/scripts/filecoinDemo.ts`

## 7. Future Enhancements

- Integration with the Filecoin Virtual Machine (FVM)
- Support for dynamic retrieval policies
- Implementation of repair/renewal mechanisms for expired deals
- Transcoding options for different video qualities
- Advanced thumbnail generation from video frames
