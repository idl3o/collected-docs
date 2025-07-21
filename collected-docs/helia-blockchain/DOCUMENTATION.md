# Helia-Blockchain Project Documentation

**Date:** May 15, 2025

## 1. Project Overview

This project is a Hardhat-based blockchain application demonstrating the integration of Helia IPFS with Ethereum smart contracts. It includes a basic time-locked smart contract (`Lock.sol`) and an NFT contract (`IPFSNft.sol`) that stores metadata on IPFS. The project is configured as an ES Module to ensure compatibility with Helia. The primary focus is on demonstrating how to store NFT metadata on IPFS, mint NFTs with IPFS metadata URIs, and retrieve that metadata.

## 2. Project Structure

The project follows a standard Hardhat project structure:

```
helia-blockchain/
├── artifacts/            # Contract compilation artifacts (ABI, bytecode)
├── cache/                # Hardhat cache
├── contracts/            # Solidity smart contracts
│   ├── Lock.sol          # Basic time-lock contract
│   └── IPFSNft.sol       # NFT contract with IPFS metadata integration
├── ignition/             # Hardhat Ignition deployment scripts
│   └── modules/
│       ├── Lock.ts
│       └── IPFSNft.ts    # Deployment module for NFT contract
├── node_modules/         # Project dependencies
├── src/                  # Main application TypeScript source files
│   ├── index.ts          # Main demo application
│   ├── scripts/          # Utility scripts
│   │   └── deployAndMintNFT.ts  # Script to deploy and mint an NFT
│   └── services/
│       └── ipfsService.ts # IPFS functionality wrapper
├── test/                 # Test files
│   ├── Lock.ts           # Tests for Lock contract
│   ├── IPFSNft.ts        # Tests for NFT contract
│   └── types.d.ts        # Custom type declarations for testing
├── typechain-types/      # Auto-generated TypeScript types for contracts
├── .gitignore            # (Recommended) Files to ignore for Git
├── hardhat.config.cjs    # Hardhat configuration file (CommonJS module)
├── package.json          # Project metadata and dependencies
├── TEST-FIX-SUMMARY.md   # Details about test environment fixes
├── tsconfig.json         # TypeScript compiler configuration
├── README.md             # Project README
└── DOCUMENTATION.md      # This documentation file
```

## 3. Setup and Installation

### Prerequisites
*   Node.js (v18 or later recommended, current setup uses v22.14.0)
*   npm (comes with Node.js)

### Installation Steps
1.  **Clone the Repository**: If this project were on a version control system like Git, you would clone it.
    ```bash
    # git clone <repository-url>
    # cd helia-blockchain
    ```
    *(Note: This project is not currently initialized as a Git repository. It's recommended to do so.)*

2.  **Install Dependencies**: Navigate to the project root directory and install the necessary npm packages.
    ```powershell
    npm install
    ```

## 4. Building the Project

The build process involves several steps:

1.  **Compile Smart Contracts**: This compiles your Solidity contracts (e.g., `Lock.sol`) and generates artifacts.
    ```powershell
    npx hardhat compile
    ```
    This command also triggers TypeChain type generation by default due to the `@nomicfoundation/hardhat-toolbox` setup.

2.  **Generate TypeChain Types (if not done by compile)**: If you need to generate types separately:
    ```powershell
    npx hardhat typechain
    ```

3.  **Compile TypeScript Code**: This transpiles your TypeScript files (e.g., in `src/` and `test/`) into JavaScript according to the `tsconfig.json` settings.
    ```powershell
    npm run build
    ```
    (This script executes `tsc`)

## 5. Running Tests

Tests are written in TypeScript and located in the `test/` directory. Since this project uses ES Modules, special configuration is needed to run the tests.

### Using npm scripts

The package.json includes pre-configured scripts for testing:

```powershell
# Run all tests
npm test

# For Windows Command Prompt (cmd.exe) users:
npm run test:win-cmd
```

### Running tests directly (PowerShell)

For more control or to run specific tests:

```powershell
# Run all tests with verbose output
$env:NODE_OPTIONS='--loader ts-node/esm'; npx hardhat test --verbose

# Run a specific test file
$env:NODE_OPTIONS='--loader ts-node/esm'; npx hardhat test ./test/Lock.ts --verbose
```

### Running tests directly (Command Prompt)

```cmd
set NODE_OPTIONS=--loader ts-node/esm && npx hardhat test --verbose
```

### Test Implementation Notes

The test environment requires several specific approaches to work correctly with ESM:

1. **Custom fixture loading**: A simple `loadFixture` function is implemented directly in `test/Lock.ts` to avoid ESM import issues.
2. **Custom type declarations**: `test/types.d.ts` provides TypeScript declarations for Chai matchers used in tests.
3. **ESM imports**: All imports from local files include `.js` extensions as required by `"moduleResolution": "node16"`.

For full details on the test environment setup and fixes, see `TEST-FIX-SUMMARY.md`.

## 6. Key Components

*   **`contracts/Lock.sol`**:
    An example smart contract from Hardhat tutorials. It allows a user to lock some Ether for a specified period, which can only be withdrawn after the unlock time has passed.

*   **`contracts/IPFSNft.sol`**:
    An ERC721 NFT contract that extends OpenZeppelin's ERC721URIStorage. It allows minting NFTs with metadata stored on IPFS, using the IPFS CID as part of the token URI (in the format `ipfs://{CID}`). Only the contract owner can mint new NFTs.

*   **`src/services/ipfsService.ts`**:
    A TypeScript service that wraps Helia IPFS functionalities. It provides methods for:
    - Adding text files to IPFS
    - Adding JSON objects to IPFS
    - Creating and storing NFT metadata
    - Retrieving content and JSON from IPFS by CID

*   **`src/scripts/deployAndMintNFT.ts`**:
    A script that demonstrates the complete workflow of deploying the NFT contract, creating metadata, storing it on IPFS, and minting an NFT that references this IPFS metadata.

*   **`test/IPFSNft.ts`**:
    Tests for the NFT contract, covering deployment, minting, ownership verification, and event emission.

*   **`hardhat.config.cjs`**:
    The Hardhat configuration file. It's a CommonJS module (`.cjs`) due to Hardhat's current loading mechanism. It specifies the Solidity compiler version, paths, and includes the `@nomicfoundation/hardhat-toolbox` for common development tasks (Ethers.js, TypeChain, Chai Matchers, etc.). It's also configured for TypeChain to output types to `typechain-types/`.

*   **`tsconfig.json`**:
    TypeScript compiler options. Crucially, it's configured for ES Module compatibility:
    *   `"module": "es2022"`
    *   `"target": "es2022"`
    *   `"moduleResolution": "node16"` (or `"nodenext"`)
    *   `"types"` array includes `"node"`, `"mocha"`, `"hardhat/types"`, `"@nomicfoundation/hardhat-ethers"`, and `"@nomicfoundation/hardhat-network-helpers"` to ensure proper type recognition for the testing environment.
    *   `"ts-node": { "esm": true, "experimentalSpecifierResolution": "node" }` to enable `ts-node` to execute ESM TypeScript files.

*   **`package.json`**:
    Defines project metadata, dependencies (`devDependencies` like Hardhat, TypeScript, Helia-related packages), and npm scripts (`build`, `test`, `dev`).
    *   `"type": "module"`: Specifies that `.js` files should be treated as ES modules by default.

*   **`src/index.ts`**:
    The main entry point for the application's TypeScript code. In this project, it might be minimal but serves as the starting point for any application logic built on top of the smart contracts.

*   **`typechain-types/`**:
    Contains TypeScript definitions automatically generated from your Solidity contracts. This enables type-safe interactions with your contracts in TypeScript code.

*   **`ignition/modules/Lock.ts`**:
    A Hardhat Ignition module for deploying the `Lock` contract. Ignition is Hardhat's declarative deployment system.

## 7. Helia Integration Notes

This project demonstrates a practical integration of Helia IPFS with Ethereum smart contracts, particularly for NFT metadata storage:

*   **IPFS Service Layer**: The `IPFSService` class in `src/services/ipfsService.ts` provides a clean abstraction over Helia's API, making it easy to add and retrieve content from IPFS.

*   **NFT Metadata Storage**: The project shows how to create, store, and retrieve NFT metadata on IPFS, following the metadata standard for NFTs.

*   **Smart Contract Integration**: The `IPFSNft.sol` contract demonstrates how to reference IPFS content from a smart contract, using the `ipfs://` URI scheme.

*   **Content Addressing**: The project leverages IPFS's content-addressing to ensure metadata integrity and persistence.

*   **ES Module Compatibility**:
    *   `package.json`: `"type": "module"` ensures Node.js treats `.js` files as ES modules.
    *   `tsconfig.json`: Configured for ES2022 modules with Node16 resolution.
    *   All imports include the `.js` extension as required for ESM compliance.

### Using IPFS in the Project

The main workflow for using IPFS in this project is:

1. **Initialize the IPFS service**:
   ```typescript
   const ipfsService = new IPFSService();
   await ipfsService.initialize();
   ```

2. **Store content on IPFS**:
   ```typescript
   // For text
   const textCid = await ipfsService.addTextFile("Hello, IPFS!");
   
   // For JSON objects
   const jsonCid = await ipfsService.addJSON({ hello: "world" });
   
   // For NFT metadata
   const metadataCid = await ipfsService.createNftMetadata(
     "My NFT", 
     "Description", 
     "https://example.com/image.png",
     [{ trait_type: "Rarity", value: "Rare" }]
   );
   ```

3. **Mint an NFT with IPFS metadata**:
   ```typescript
   const mintTx = await nftContract.mintNFT(ownerAddress, metadataCid);
   ```

4. **Retrieve content from IPFS**:
   ```typescript
   // Get text
   const text = await ipfsService.getTextContent(textCid);
   
   // Get JSON
   const json = await ipfsService.getJSON(jsonCid);
   ```

### Best Practices

1. **Persistence**: For production applications, consider implementing pinning to ensure metadata persistence on IPFS.
2. **Gateways**: For browser-based applications, provide gateway URLs for IPFS resources.
3. **Error Handling**: Implement proper error handling for IPFS operations, as network issues can occur.
4. **Immutability**: Once NFT metadata is created and referenced by a contract, treat it as immutable.

---
*This documentation was generated with the assistance of GitHub Copilot.*
