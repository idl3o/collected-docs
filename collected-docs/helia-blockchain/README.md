# helia-blockchain Project

This project demonstrates the integration of Helia (an IPFS implementation) with Hardhat (an Ethereum development environment) and Filecoin for decentralized storage of NFT assets and metadata. It provides three different storage options for NFTs with different persistence guarantees:

1. **Basic IPFS** (IPFSService): Content-addressed storage for development and testing
2. **Pinata Pinning** (PinataService): Enhanced persistence with centralized pinning
3. **Filecoin Storage Deals** (FilecoinService): Long-term guaranteed storage with cryptographic proofs

This modular architecture allows developers to choose the right storage solution based on their specific NFT requirements, balancing cost, persistence, and decentralization.

## Features

- **Multi-tier Storage Architecture**:
  - **Base tier** (IPFSService): Content-addressed storage using Helia for development and testing
  - **Standard tier** (PinataService): Enhanced persistence through Pinata pinning service
  - **Premium tier** (FilecoinService): Guaranteed long-term storage through Filecoin deals

- **NFT Integration**:
  - ERC-721 smart contract with IPFS metadata integration
  - Specialized metadata handling for different asset types
  - Tokenized media with content-addressed URIs

- **Video NFT Support**:
  - Optimized video storage with multiple quality options
  - Thumbnail generation and management
  - Enhanced metadata with video-specific properties

- **Comprehensive Developer Experience**:
  - Full TypeScript implementation with ES module support
  - Detailed demos showcasing each storage approach
  - End-to-end workflow from content creation to NFT minting

## Project Setup

1.  **Clone the repository (if applicable)**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    ```bash
    cp .env.example .env
    ```
    Then edit `.env` file with your API keys and tokens.

## Available Scripts

-   **Build the project:**
    ```bash
    npm run build
    ```
    This compiles TypeScript files to JavaScript in the `dist` directory.

-   **Start the application:**
    ```bash
    npm run start
    ```
    This runs the compiled JavaScript application from `dist/index.js` and demonstrates both IPFS and Filecoin integration.

-   **Run in development mode:**
    ```bash
    npm run dev
    ```
    This uses `nodemon` and `ts-node` to automatically restart the application when TypeScript files in `src` change.

-   **Run IPFS and Filecoin demo:**
    ```powershell
    $env:NODE_OPTIONS='--loader ts-node/esm'; npx ts-node src/index.ts
    ```
    This demonstrates both IPFS and Filecoin functionality for NFT storage.
    
-   **Run Filecoin demo specifically:**
    ```powershell
    $env:NODE_OPTIONS='--loader ts-node/esm'; npx ts-node src/scripts/filecoinDemo.ts
    ```
    Or use the npm script:
    ```bash
    npm run demo:filecoin
    ```
    This demonstrates video NFT storage using the Filecoin simulation.
    
-   **Run storage services comparison demo:**
    ```powershell
    $env:NODE_OPTIONS='--loader ts-node/esm'; npx ts-node src/scripts/serviceComparisonDemo.ts
    ```
    Or use the npm script:
    ```bash
    npm run demo:comparison
    ```
    This compares the three different storage approaches side-by-side.
    
-   **Run integrated multi-tier storage demo:**
    ```powershell
    $env:NODE_OPTIONS='--loader ts-node/esm'; npx ts-node src/scripts/integratedStorageDemo.ts
    ```
    Or use the npm script:
    ```bash
    npm run demo:integrated
    ```
    This shows how all three services can work together in a production-ready NFT workflow.
    ```powershell
    $env:NODE_OPTIONS='--loader ts-node/esm'; npx ts-node src/scripts/filecoinDemo.ts
    ```
    This runs an in-depth demonstration of Filecoin integration for video NFTs.

-   **Run storage services comparison demo:**
    ```powershell
    $env:NODE_OPTIONS='--loader ts-node/esm'; npx ts-node src/scripts/serviceComparisonDemo.ts
    ```
    This runs a comprehensive comparison between IPFSService, PinataService, and FilecoinService.

-   **Deploy and mint NFT:**
    ```powershell
    $env:NODE_OPTIONS='--loader ts-node/esm'; npx ts-node src/scripts/deployAndMintNFT.ts
    ```
    This deploys the NFT contract and mints an NFT with IPFS metadata.

-   **Run tests:**
    ```bash
    npm test
    ```
    This runs all test files using Hardhat and ts-node with ESM support.

-   **Run tests with verbose output:**
    ```bash
    npm run test:verbose
    ```
    This runs all tests with more detailed output.

-   **Run Lock contract tests specifically:**
    ```bash
    npm run test:lock
    ```
    This runs only the tests for the Lock contract.

-   **Run Lock tests with verbose output:**
    ```bash
    npm run test:lock:verbose
    ```
    This runs only the Lock tests with more detailed output.

## Important Notes

This project uses ES Modules (`"type": "module"` in `package.json`) to ensure compatibility with Helia, which is an ES Module. This requires some specific configurations:

1. **Import paths** must include `.js` extensions for relative imports, even though the source files have `.ts` extensions.
2. **`hardhat.config.cjs`** is a CommonJS file, not an ES Module.
3. **Test files** use custom helpers for fixture loading to avoid ESM compatibility issues.
4. **Running tests** requires the `ts-node/esm` loader to properly handle TypeScript ESM imports.

For detailed documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md).
For information about how the test environment was configured, see [TEST-FIX-SUMMARY.md](./TEST-FIX-SUMMARY.md).
For a comparison of storage options, see [STORAGE-COMPARISON.md](./STORAGE-COMPARISON.md).
For information about the Filecoin integration, see [FILECOIN-INTEGRATION.md](./FILECOIN-INTEGRATION.md).
