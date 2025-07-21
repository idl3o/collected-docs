<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Merkle Research Platform - Copilot Instructions

This is a **Merkle Research Platform** optimized for Vercel hosting with edge computing and memory-efficient engram generation.

## Architecture Guidelines

### Vercel Optimization
- Use Vercel Edge Runtime for intensive operations
- Implement static generation for regenerable files
- Leverage Edge Functions for cryptographic operations
- Optimize for global CDN distribution

### Memory Efficiency
- Implement streaming responses for large data
- Use lazy loading and memory management patterns
- Generate engrams (compressed knowledge representations) instead of full objects
- Prefer lightweight data structures and minimal memory footprint

### Merkle Source Tree
- Every research source must be cryptographically hashed (SHA-256)
- Implement dependency tracking with immutable lineage
- Ensure all operations maintain integrity verification
- Focus on engram generation for platform self-development

### Platform Self-Development Focus
- Demo should showcase the platform improving itself
- Generate engrams that represent compressed knowledge states
- Implement self-improvement spirals with measurable metrics
- Show human-AI collaboration optimization

## Code Patterns

### Edge Functions
- Use `export const runtime = 'edge'` for API routes
- Implement streaming for large responses
- Handle cryptographic operations at the edge
- Minimize memory usage and processing time

### Engram Generation
- Create compressed representations of knowledge states
- Use efficient serialization formats (protobuf, MessagePack)
- Implement delta compression for state changes
- Focus on memory-efficient data structures

### Research Synthesis
- Implement whitepaper generation with minimal memory usage
- Use streaming for large document processing
- Generate quality metrics and improvement suggestions
- Maintain cryptographic verification throughout

## Technology Stack
- Next.js 15 with App Router and TypeScript
- Vercel Edge Runtime for intensive operations
- Tailwind CSS for responsive UI
- Cryptographic operations using Web Crypto API
- Memory-efficient data structures and streaming

## Performance Goals
- Sub-100ms response times for edge functions
- Minimal memory footprint for all operations
- Efficient engram generation and compression
- Scalable across Vercel's global edge network
