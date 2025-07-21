# Build and Deployment Guide

This document provides instructions on how to compile, deploy, and set up the build environment for the helia-blockchain project.

## Prerequisites

- Node.js v16.x or higher
- npm v7.x or higher
- Git

## Setting Up the Build Environment

The easiest way to set up the build environment is to use the provided setup script:

```bash
# Install dependencies, compile TypeScript, and set up Hardhat
npm run setup
```

This script will:
1. Install all dependencies
2. Compile TypeScript files
3. Create a `.env` file if it doesn't exist
4. Compile Solidity contracts
5. Generate TypeChain types
6. Run a simple test to verify the setup

## Manual Setup Steps

If you prefer to set up the environment manually, follow these steps:

### 1. Install Dependencies

```bash
npm install
```

### 2. Compile TypeScript

```bash
npm run build
```

### 3. Compile Solidity Contracts

```bash
npx hardhat compile
```

### 4. Generate TypeChain Types

```bash
npm run typechain
```

## Deployment

### Local Development Network

1. Start a local Hardhat node:

```bash
npx hardhat node
```

2. Deploy the contracts to the local network:

```bash
npm run deploy
```

3. Deploy and mint an NFT in one command:

```bash
npm run deploy:mint
```

### Testnet or Mainnet Deployment

1. Configure your `.env` file with the appropriate keys:
   - Set `ETH_NODE_URL` to your Ethereum node URL (Infura, Alchemy, etc.)
   - Set `PRIVATE_KEY` to your private key (without 0x prefix)

2. Deploy to the desired network:

```bash
npx hardhat run src/scripts/deploy.ts --network <network-name>
```

Replace `<network-name>` with the network you want to deploy to (e.g., `goerli`, `sepolia`, `mainnet`).

## Running the Application

### Development Mode

To run the application in development mode with hot reloading:

```bash
npm run dev
```

### Production Mode

To run the application in production mode:

```bash
npm run start
```

### Web Application

To start the web interface:

```bash
npm run webapp
```

## Running Tests

Run all tests:

```bash
npm run test
```

Run tests with verbose output:

```bash
npm run test:verbose
```

Run specific test files:

```bash
npm run test:lock # Runs only the Lock contract tests
```

## Demo Scripts

The project includes several demonstration scripts to showcase functionality:

```bash
# Run the gateway test demo
npm run demo:gateway

# Run the Filecoin integration demo
npm run demo:filecoin

# Run the services comparison demo
npm run demo:comparison

# Run the integrated storage demo
npm run demo:integrated

# Run the benchmark storage services demo
npm run demo:benchmark
```

## Troubleshooting

If you encounter any issues during setup or deployment:

1. Make sure your Node.js version is compatible (v16.x or higher)
2. Check your `.env` file for correct configuration
3. Try cleaning the cache and rebuilding:

```bash
npx hardhat clean
npm run setup
```

4. Check the network configuration in your `hardhat.config.cjs` file
