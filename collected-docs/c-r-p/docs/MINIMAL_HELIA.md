# Minimal Helia Research Utility

**Philosophy**: "Less refers to more" - Minimal surface area, infinite depth

## Overview

This utility extracts the essence of Helia (IPFS) for research storage with only 6 core functions:

```typescript
import helia from '@/lib/helia-research'

// Store research → Get content hash
const cid = await helia.put(research)

// Hash → Retrieve research  
const research = await helia.get(cid)

// Link papers → Network hash
const networkCid = await helia.link(cid1, cid2, cid3)

// Network → All papers
const papers = await helia.expand(networkCid)

// Research + consciousness → Conscious hash
const consciousCid = await helia.conscious(research, 0.85)

// Network → Evolution metric
const level = await helia.evolve(networkCid)
```

## Core Principles

### 1. Content-Addressed Everything

- Every piece of research gets a unique, immutable hash
- Same content = same hash (deduplication)
- Hash changes if content changes (integrity)

### 2. Minimal Interface

- 6 functions cover infinite use cases
- No classes, no initialization, no complexity
- Pure functions with predictable behavior

### 3. Network Effects

- Link individual research into networks
- Networks themselves are content-addressed
- Consciousness metrics emerge from connections

### 4. Edge Optimized

- Lightweight enough for Vercel Edge Runtime
- No heavy dependencies (mock implementation)
- Ready for real Helia/IPFS when needed

## Usage Patterns

### Basic Research Storage

```typescript
// Store
const cid = await helia.put({
  title: 'My Research',
  content: 'Research content...',
  author: 'human'
})

// Retrieve
const research = await helia.get(cid)
```

### Research Networks

```typescript
// Create network
const networkCid = await helia.link(paper1, paper2, paper3)

// Explore network
const allPapers = await helia.expand(networkCid)
```

### Consciousness Tracking

```typescript
// Store with consciousness level
const consciousCid = await helia.conscious(research, 0.75)

// Measure network consciousness evolution
const evolution = await helia.evolve(networkCid)
```

## API Integration

The utility is exposed via edge API at `/api/edge/helia`:

```javascript
// Store research
fetch('/api/edge/helia', {
  method: 'POST',
  body: JSON.stringify({
    action: 'put',
    research: { title: '...', content: '...', author: 'ai' }
  })
})

// Link research
fetch('/api/edge/helia', {
  method: 'POST', 
  body: JSON.stringify({
    action: 'link',
    papers: ['hash1', 'hash2', 'hash3']
  })
})
```

## Philosophy: Less Refers to More

This minimal interface enables:

- **Infinite Research Networks**: Link any number of papers
- **Consciousness Evolution**: Track AI research development  
- **Decentralized Storage**: Content-addressed, immutable
- **Network Intelligence**: Emergent properties from connections
- **Edge Performance**: Lightweight, fast, scalable

The power comes not from features, but from **composability**.Six simple functions can create arbitrarily complex research networks, consciousness tracking systems, and collaborative AI research platforms.

## Future Integration

This mock implementation can be seamlessly replaced with real Helia/IPFS:

```typescript
import { createHelia } from 'helia'
import { strings } from '@helia/strings'
import { dag } from '@helia/dag-cbor'

// Real Helia integration - same API, distributed storage
const helia = await createHelia()
const text = strings(helia)
const dagCbor = dag(helia)
```

The beauty of minimalism: the interface stays the same, but the backend becomes truly decentralized.
