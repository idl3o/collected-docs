# Security Considerations for Helia-Blockchain

This document outlines security considerations and best practices for using the Helia-Blockchain project in production environments. Following these guidelines will help ensure the security and reliability of your NFT storage infrastructure.

## Table of Contents

1. [API Key Management](#api-key-management)
2. [Content Security](#content-security)
3. [Blockchain Security](#blockchain-security)
4. [Access Control](#access-control)
5. [Availability and Redundancy](#availability-and-redundancy)
6. [Error Handling and Monitoring](#error-handling-and-monitoring)
7. [Pinning Services Security](#pinning-services-security)
8. [Filecoin Deal Security](#filecoin-deal-security)

## API Key Management

### Secure Storage of Credentials

- **Never hardcode API keys** or secrets in your application code or commit them to version control
- Use environment variables or secure vaults to store API keys
- For production, consider using a secrets management service like:
  - AWS Secrets Manager
  - Azure Key Vault
  - HashiCorp Vault
  - Google Secret Manager

### Token Permissions

- Use scoped API tokens with the minimum necessary permissions
- Create separate API keys for development, testing, and production environments
- Rotate keys regularly (at least every 90 days)
- Implement a process for immediate key revocation if compromised

### Example: Secure Environment Variable Setup

```bash
# In development (.env file NOT committed to git)
PINATA_API_KEY=k2y...
PINATA_API_SECRET=a83e...
WEB3_STORAGE_TOKEN=eyJh...

# In production (environment variables set in hosting platform)
# No .env file in production deployment
```

## Content Security

### Content Validation

- Validate and sanitize all content before uploading to IPFS
- Implement file type restrictions to prevent malicious file uploads
- Consider using content scanning for malware detection
- Verify file integrity with checksums before and after upload

### Metadata Security

- Validate NFT metadata against a schema before storage
- Sanitize all user-provided strings to prevent injection attacks
- Use immutable metadata where appropriate to prevent tampering
- Consider using signed metadata for additional verification

### Private Content

- For restricted content, consider:
  - Encrypting content before uploading to IPFS
  - Using Pinata's Submarine feature for private pins
  - Implementing token-gated access control
  - Using verifiable encryption/decryption with wallet signatures

## Blockchain Security

### Smart Contract Security

- Follow OpenZeppelin's security best practices
- Implement proper access control in all contracts
- Use reentrancy guards for all state-changing functions
- Consider using upgradeable contracts for critical functionality
- Always perform thorough testing and audits before deployment

### Safe NFT Minting

- Implement rate limiting for minting functions
- Validate all inputs before minting
- Consider using delayed reveals for high-value collections
- Implement proper signature verification for gasless minting

### Example: Secure Minting Function

```solidity
// Access control
function mintNFT(address to, string calldata ipfsCid) 
    external 
    onlyOwner  // Restricts who can call this function
    returns (uint256) 
{
    // Input validation
    require(bytes(ipfsCid).length > 0, "IPFS CID cannot be empty");
    require(to != address(0), "Cannot mint to zero address");
    
    uint256 tokenId = _nextTokenId++;
    _mint(to, tokenId);
    _setTokenURI(tokenId, string(abi.encodePacked("ipfs://", ipfsCid)));
    
    emit NftMinted(tokenId, to, string(abi.encodePacked("ipfs://", ipfsCid)));
    
    return tokenId;
}
```

## Access Control

### Service Account Permissions

- Create service-specific accounts for each integration
- Apply least privilege principle to all accounts
- Monitor and audit access logs regularly
- Implement MFA for administrative accounts

### API Security

- Implement rate limiting for all API endpoints
- Use HTTPS for all API communications
- Validate all API requests with proper authentication
- Consider implementing JWT-based authentication for services

### Gateway Access Control

- For premium content, consider using a token-gated gateway
- Implement referrer checking to prevent hotlinking
- Consider using Cloudflare or similar services for DDoS protection
- Implement proper CORS policies for web applications

## Availability and Redundancy

### Redundant Storage

- Use multiple IPFS nodes or services for redundancy
- Configure backup gateways for content retrieval
- Implement automatic failover mechanisms
- Consider geographic distribution of storage providers

### Deal Redundancy (Filecoin)

- Create multiple storage deals for important content
- Use different miners for redundancy
- Consider replication across multiple geographic regions
- Monitor deal status and renew deals before expiration

### Example Configuration: Multiple Gateway Support

```typescript
// Use the GatewayManager service for automatic failover
import { getGatewayManager } from './services/gatewayManager.js';

const gatewayManager = getGatewayManager();
gatewayManager.startHealthChecks();

// When retrieving content, use the best available gateway
const bestUrl = gatewayManager.getBestGatewayUrl(cid);
```

## Error Handling and Monitoring

### Robust Error Handling

- Implement proper try/catch blocks around all service calls
- Create fallback mechanisms for service failures
- Log detailed error information for debugging
- Implement circuit breakers for unreliable services

### Monitoring and Alerts

- Set up monitoring for all critical services
- Create alerts for:
  - Failed uploads
  - Filecoin deal failures
  - Gateway unavailability
  - API rate limit warnings
- Implement health check endpoints for all services

### Audit Logging

- Log all significant operations (uploads, pins, deal creation)
- Store logs securely with tamper-evident mechanisms
- Implement structured logging for easier analysis
- Consider using a centralized logging service

## Pinning Services Security

### Pinata-Specific Security

- Regularly verify pin status for important content
- Implement automatic re-pinning for failed pins
- Use Pinata's dedicated gateways for high-traffic NFTs
- Consider using Pinata's submarine pins for unreleased content

### Example: Secure Pinata Implementation

```typescript
async function securePin(filePath: string, options: PinOptions = {}) {
  try {
    // Verify file exists and is valid
    if (!fs.existsSync(filePath)) {
      throw new Error(`File does not exist: ${filePath}`);
    }
    
    // Add security metadata
    options.pinataMetadata = {
      ...options.pinataMetadata,
      keyvalues: {
        ...options.pinataMetadata?.keyvalues,
        securityLevel: 'high',
        contentVerified: 'true',
      }
    };
    
    // Pin to Pinata with retries
    let attempts = 0;
    const maxAttempts = 3;
    let lastError;
    
    while (attempts < maxAttempts) {
      try {
        const cid = await pinataService.pinFileToIPFS(filePath, FileType.IMAGE, options);
        console.log(`Successfully pinned file after ${attempts + 1} attempts`);
        return cid;
      } catch (error) {
        lastError = error;
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }
    
    throw new Error(`Failed to pin file after ${maxAttempts} attempts: ${lastError}`);
  } catch (error) {
    console.error('Secure pin failed:', error);
    throw error;
  }
}
```

## Filecoin Deal Security

### Deal Parameters

- Carefully choose miners based on reputation and past performance
- Set appropriate deal durations based on content importance
- Use verified deals for cost efficiency when possible
- Consider using repair workers to monitor and repair failed deals

### Deal Verification

- Verify deal status periodically
- Implement alerts for deal state changes
- Store deal IDs securely for future reference
- Consider storing deal proofs on-chain for high-value assets

### Example: Secure Deal Creation

```typescript
async function secureFilecoinDeal(filePath: string, 
  options: { name: string, replicas?: number, minDuration?: number }
) {
  // Default to 2 replicas and 180 days minimum duration
  const replicas = options.replicas || 2;
  const minDuration = options.minDuration || 180;
  const dealResults = [];
  
  // Create multiple deals for redundancy
  for (let i = 0; i < replicas; i++) {
    try {
      const result = await filecoinService.storeFile(filePath, {
        name: options.name,
        minDuration: minDuration
      });
      
      dealResults.push({
        dealId: result.dealId,
        miner: result.miner,
        status: 'created'
      });
      
    } catch (error) {
      console.error(`Failed to create deal replica ${i+1}:`, error);
    }
  }
  
  // Verify we have at least one successful deal
  if (dealResults.length === 0) {
    throw new Error('Failed to create any Filecoin deals');
  }
  
  return dealResults;
}
```

## Conclusion

Security in blockchain and decentralized storage systems requires a multi-layered approach. By following these guidelines, you can significantly reduce the risk of security incidents and ensure that your NFT metadata and assets remain secure, available, and persistent over time.

Always keep your dependencies updated and regularly review your security practices as the ecosystem evolves.

---

*This security documentation is provided as general guidance and should be adapted to your specific deployment environment and security requirements.*
