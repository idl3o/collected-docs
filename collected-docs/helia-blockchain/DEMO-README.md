# Helia-Blockchain with Filecoin Integration

This project demonstrates how to integrate Helia IPFS and Filecoin with Ethereum smart contracts, providing a complete solution for NFT metadata and video storage with variable persistence options.

## What's Included

1. **Smart Contracts**
   - `IPFSNft.sol`: An ERC721 NFT contract that stores metadata URIs on IPFS
     - Inherits from OpenZeppelin's ERC721URIStorage for best practices
     - Custom mint function with IPFS CID parameter
     - Owner-controlled minting with access control
     - TokenURI returns IPFS gateway URLs for better compatibility

2. **Storage Services**
   - `IPFSService`: A base TypeScript class that provides a simple interface to Helia IPFS
   - `PinataService`: Enhanced service with pinning capabilities for better content persistence
   - `FilecoinService`: Advanced service leveraging Filecoin for long-term decentralized storage
   - Functions for adding/retrieving text and JSON to/from IPFS
   - Specialized NFT metadata handling for images and videos

3. **Demo Scripts**
   - Main demo in `src/index.ts` showing IPFS and Filecoin integration
   - `src/scripts/filecoinDemo.ts` demonstrating Filecoin storage for video NFTs
   - `src/scripts/serviceComparisonDemo.ts` comparing all three storage services
   - `src/scripts/integratedStorageDemo.ts` showing how all services work together
   - Deployment script in `src/scripts/deployAndMintNFT.ts`

## How to Run the Demo

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run the Main Demo**

   ```powershell
   $env:NODE_OPTIONS='--loader ts-node/esm'; npx ts-node src/index.ts
   ```

   This will:
   - Initialize a Helia IPFS node and Filecoin service
   - Store a text file on IPFS
   - Store a video file on Filecoin
   - Create and store NFT metadata on IPFS
   - Retrieve and display the stored content

3. **Run Storage Service Comparison Demo**

   ```powershell
   $env:NODE_OPTIONS='--loader ts-node/esm'; npx ts-node src/scripts/serviceComparisonDemo.ts
   ```

   This will compare the features and capabilities of:
   - Basic IPFS storage
   - Pinata enhanced storage
   - Filecoin long-term storage

4. **Run Filecoin Demo**

   ```powershell
   $env:NODE_OPTIONS='--loader ts-node/esm'; npx ts-node src/scripts/filecoinDemo.ts
   ```

   This will demonstrate Filecoin video storage for NFTs:
   - Store a video on Filecoin with storage deals
   - Create enhanced metadata with Filecoin deal information
   - Show the complete workflow for video NFT creation

5. **Compile the Smart Contracts**

   ```bash
   npx hardhat compile
   ```

6. **Deploy and Mint NFT (Local Network)**

   Start a local Hardhat node:
   ```bash
   npx hardhat node
   ```

   In a separate terminal, run the deployment script:
   ```powershell
   $env:NODE_OPTIONS='--loader ts-node/esm'; npx ts-node src/scripts/deployAndMintNFT.ts
   ```

## Key Features

- **Multiple Storage Options**: Choose the right storage method for your assets:
  - Basic IPFS for development/testing
  - Pinata for enhanced availability
  - Filecoin for long-term guaranteed storage
- **Video NFT Support**: Complete pipeline for video NFT creation and storage
- **Decentralized Metadata Storage**: Store NFT metadata on IPFS instead of centralized servers
- **Content-Addressed Storage**: IPFS ensures content integrity through CIDs
- **Storage Deals**: Filecoin integration for guaranteed long-term storage with economic incentives
- **Smart Contract Integration**: Reference IPFS content from Ethereum contracts
- **Modern JavaScript**: ES Module support for Helia compatibility

## Project Structure

- **`contracts/`**: Solidity smart contracts
  - **`IPFSNft.sol`**: ERC-721 NFT contract with IPFS metadata URI storage
  - **`Lock.sol`**: Example time-locked contract for testing

- **`src/`**: TypeScript source code
  - **`services/`**: Storage service implementations
    - **`ipfsService.ts`**: Base IPFS implementation using Helia
    - **`pinataService.ts`**: Enhanced service with Pinata pinning
    - **`filecoinService.ts`**: Advanced service with Filecoin storage deals
  - **`scripts/`**: Demo and utility scripts
    - **`deployAndMintNFT.ts`**: Deploy contract and mint an NFT
    - **`filecoinDemo.ts`**: Demonstrates Filecoin video NFT storage
    - **`serviceComparisonDemo.ts`**: Side-by-side comparison of all services
    - **`integratedStorageDemo.ts`**: Shows multi-tier storage architecture
  - **`index.ts`**: Main application entry point

- **`test/`**: Test suites
  - **`FilecoinService.ts`**: Tests for Filecoin integration
  - **`IPFSNft.ts`**: Tests for the NFT contract
  - **`Lock.ts`**: Tests for the Lock contract

- **Documentation**:
  - **`README.md`**: Project overview and setup guide
  - **`DEMO-README.md`**: Detailed demo walkthrough (this file)
  - **`FILECOIN-INTEGRATION.md`**: Filecoin implementation details
  - **`STORAGE-COMPARISON.md`**: In-depth comparison of storage options
  - **`DOCUMENTATION.md`**: Comprehensive project documentation

## Storage Services Architecture

This project implements a layered storage architecture:

1. **Base Layer (IPFSService)**: 
   - Provides fundamental content-addressed storage using Helia
   - Uses in-memory blockstore and datastore (temporary by default)
   - Handles basic operations (add/get text, JSON, files)
   - Perfect for development, testing, and non-critical content

2. **Enhanced Layer (PinataService)**: 
   - Extends IPFSService to add content pinning capabilities
   - Integrates with Pinata pinning service for better content persistence
   - Adds specialized handling for different file types (images, videos)
   - Suitable for production NFTs with modest persistence needs

3. **Guaranteed Layer (FilecoinService)**: 
   - Extends IPFSService to create Filecoin storage deals
   - Provides cryptographic proof of storage and economic incentives
   - Optimized for video NFTs with configurable quality settings
   - Best for high-value content requiring long-term guarantees

All services share a common interface pattern, making them interchangeable in your application while providing different levels of persistence guarantees. This modular design allows you to choose the appropriate storage solution based on your specific NFT requirements.

### Visual Architecture

The project includes visual diagrams to help you understand the architecture:

- View the [Architecture Diagram](./docs/architecture-diagram.md) for a visual representation
- You can generate the PNG image by running: `npm run docs:diagram`

The diagrams illustrate:
- The relationship between storage services
- How NFT components integrate with storage
- Decision flow for selecting the right storage service

## Storage Services Comparison

| Feature               | IPFSService                | PinataService                      | FilecoinService                     |
|-----------------------|----------------------------|------------------------------------|------------------------------------|
| **Storage Type**      | Content-addressed, local   | Content-addressed, pinned          | Content-addressed with deals        |
| **Persistence**       | Temporary (memory)         | Semi-permanent (centralized)       | Long-term (decentralized)           |
| **Recovery**          | None                       | Service-based                      | Cryptographic proofs                |
| **Best For**          | Development, testing       | Standard NFTs, images              | Premium NFTs, videos                |
| **Specialized For**   | JSON metadata, small files | Images, collection management      | Videos, archival content            |
| **Cost**              | Free                       | Service subscription               | Pay per storage deal                |
| **Implementation**    | Simple                     | Moderate                           | Advanced                            |
| **NFT Metadata**      | Basic                      | Enhanced with gateway URLs         | Comprehensive with deal information |
| **Gateway Support**   | Basic                      | Multiple CDN options               | Multiple retrieval paths            |
| **Storage Proof**     | None                       | API-based confirmation             | Cryptographic verification          |

## Notes

- This is a demonstration project and not intended for production use without further security review
- The IPFS node is using in-memory storage, which doesn't persist data between runs
- For full Filecoin integration, you'll need a Web3.Storage token in your `.env` file
- See `STORAGE-COMPARISON.md` for a detailed comparison of the storage options
- See `FILECOIN-INTEGRATION.md` for details on the Filecoin implementation

## Environment Variables

For full functionality, create a `.env` file with the following variables:

```env
# Pinata credentials (optional)
PINATA_API_KEY=your_api_key
PINATA_API_SECRET=your_api_secret
# OR
PINATA_JWT=your_jwt_token

# Web3.Storage for Filecoin integration (optional)
WEB3_STORAGE_TOKEN=your_token
```

If these variables are not provided, the services will run in simulation mode.

## Choosing the Right Storage Service

When implementing NFT storage in your applications, consider these guidelines:

1. **For development and testing:**
   - Use `IPFSService` for fast, simple implementation
   - Perfect for rapid prototyping and local development
   ```typescript
   const ipfs = new IPFSService();
   await ipfs.initialize();
   
   // Store and retrieve metadata
   const cid = await ipfs.addJson({ name: "My NFT", description: "Test NFT" });
   const metadata = await ipfs.getJson(cid);
   ```

2. **For standard NFTs with images:**
   - Use `PinataService` for reliable pinning and persistence
   - Suitable for most production NFT collections with modest budgets
   ```typescript
   const pinata = new PinataService();
   await pinata.initialize();
   
   // Pin image and create metadata with pinned content
   const imageCid = await pinata.addFile(imagePath, FileType.IMAGE);
   const metadataCid = await pinata.addJson({
     name: "Pinned NFT",
     description: "NFT with pinned image",
     image: pinata.getGatewayUrl(imageCid)
   });
   ```

3. **For premium video NFTs or high-value assets:**
   - Use `FilecoinService` for guaranteed long-term storage
   - Ideal for NFTs that need verifiable storage proofs
   - Best for video content that needs long-term availability
   ```typescript
   const filecoin = new FilecoinService();
   await filecoin.initialize();
   
   // Store video with Filecoin guarantees
   const storageResponse = await filecoin.storeVideoNFT(
     videoPath,
     "Premium Video NFT", 
     "High-quality video with storage guarantees", 
     FilecoinVideoQuality.HIGH,
     { dealConfig: { replicationFactor: 3, minDuration: 180 } }
   );
   
   // Check deal status
   const status = await filecoin.checkDealStatus(storageResponse.cid);
   ```

4. **For a comprehensive solution:**
   - Combine all three services as demonstrated in `integratedStorageDemo.ts`
   - Store thumbnails and metadata on IPFS/Pinata
   - Store video content on Filecoin
   - Link everything together in your NFT metadata
   ```typescript
   // Example from integratedStorageDemo.ts
   const thumbnailCid = await pinata.addFile(thumbnailPath, FileType.IMAGE);
   const videoCid = await filecoin.storeFile(videoPath, { 
     name: "Premium Video", 
     dealConfig: { verified: true } 
   });
   
   // Create comprehensive metadata with both services
   const metadata = {
     name: "Multi-tier NFT",
     description: "NFT with optimized storage tiers",
     image: pinata.getGatewayUrl(thumbnailCid),
     animation_url: filecoin.getGatewayUrl(videoCid),
     properties: {
       video_storage: "filecoin",
       storage_deal: videoCid.dealId,
       persistence: "guaranteed"
     }
   };
   ```

## Integration Best Practices

When working with multiple storage services in production, consider these best practices:

1. **Tiered Storage Strategy**
   - Store metadata and thumbnails on IPFS/Pinata (fast retrieval)
   - Store large media files on Filecoin (long-term storage)
   - Reference all content with proper gateway URLs in metadata

2. **Content Management Workflow**
   - Start with basic IPFS during content preparation/testing
   - Once finalized, pin important content with Pinata
   - For valuable assets, create Filecoin storage deals
   - Update metadata with all relevant storage information

3. **Smart Contract Integration**
   - Store only CIDs or gateway URLs in contract storage
   - Consider on-chain verification for important Filecoin deals
   - Implement metadata update mechanisms for deal status changes

4. **Gateway Management**
   - Use multiple gateway providers for redundancy
   - Consider running your own IPFS gateway for critical assets
   - Implement fallback mechanisms in dApp frontends

## Further Development

1. Add real video transcoding capabilities
2. Create a web frontend for the NFT contract
3. Extend the NFT contract with additional features (royalties, batch minting, etc.)
4. Deploy to a public testnet or mainnet
5. Implement more advanced Filecoin deal management
6. Add more IPFS gateways for better content distribution
7. Integrate with on-chain storage verification mechanisms
8. Add content filtering and automatic thumbnail generation
9. Implement cost optimization strategies for storage deals
