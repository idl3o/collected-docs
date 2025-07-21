# Helia-Blockchain Integration Demo

This project demonstrates how to integrate Helia IPFS with Ethereum smart contracts, specifically for NFT metadata storage and retrieval.

## What's Included

1. **Smart Contracts**
   - `IPFSNft.sol`: An ERC721 NFT contract that stores metadata URIs on IPFS

2. **IPFS Service**
   - `IPFSService`: A TypeScript class that provides a simple interface to Helia IPFS
   - Functions for adding/retrieving text and JSON to/from IPFS
   - Specialized NFT metadata handling

3. **Demo Scripts**
   - Main demo in `src/index.ts` showing IPFS storage and retrieval
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
   - Initialize a Helia IPFS node
   - Store a text file on IPFS
   - Create and store NFT metadata on IPFS
   - Retrieve and display the stored content

3. **Compile the Smart Contracts**

   ```bash
   npx hardhat compile
   ```

4. **Deploy and Mint NFT (Local Network)**

   Start a local Hardhat node:
   ```bash
   npx hardhat node
   ```

   In a separate terminal, run the deployment script:
   ```powershell
   $env:NODE_OPTIONS='--loader ts-node/esm'; npx ts-node src/scripts/deployAndMintNFT.ts
   ```

## Key Features

- **Decentralized Metadata Storage**: Store NFT metadata on IPFS instead of centralized servers
- **Content-Addressed Storage**: IPFS ensures content integrity through CIDs
- **Smart Contract Integration**: Reference IPFS content from Ethereum contracts
- **Modern JavaScript**: ES Module support for Helia compatibility

## Project Structure

- **`contracts/`**: Smart contracts
- **`src/`**: TypeScript source code
  - **`src/services/`**: Service classes (IPFS Service)
  - **`src/scripts/`**: Deployment and utility scripts
- **`test/`**: Test files for smart contracts

## Notes

- This is a demonstration project and not intended for production use without further security review
- The IPFS node is using in-memory storage, which doesn't persist data between runs
- For production, consider using an IPFS pinning service to ensure data availability

## Further Development

1. Add IPFS pinning service integration
2. Create a web frontend for the NFT contract
3. Extend the NFT contract with additional features (royalties, batch minting, etc.)
4. Deploy to a public testnet or mainnet
