# Focused Core Architecture - Text, Images, Links

## Simplified Scope
**Primary Inputs**: Text streams, image captures, link references  
**Core Goal**: Seamless thought recording with AI-enhanced connections  
**Architecture**: Minimal viable system for maximum cognitive amplification

## Essential File Structure

```
intelligent-notes-app/
├── backend/
│   ├── main.py                     # FastAPI server
│   ├── models/
│   │   ├── thought.py              # Core thought data model
│   │   ├── media.py                # Image/link handling
│   │   └── connection.py           # Relationship mapping
│   ├── core/
│   │   ├── thought_processor.py    # Text processing engine
│   │   ├── media_processor.py      # Image/link analysis
│   │   └── connection_engine.py    # AI relationship discovery
│   ├── api/
│   │   ├── capture.py              # Input endpoints
│   │   └── insights.py             # AI suggestions
│   └── database/
│       └── database.py             # SQLite for simplicity
├── frontend/
│   ├── src/
│   │   ├── App.tsx                 # Main application
│   │   ├── components/
│   │   │   ├── ThoughtCapture.tsx  # Text input interface
│   │   │   ├── MediaUpload.tsx     # Image/link handling
│   │   │   ├── ConnectionView.tsx  # Relationship visualization
│   │   │   └── InsightPanel.tsx    # AI suggestions display
│   │   ├── hooks/
│   │   │   ├── useThoughtStream.ts # Real-time capture
│   │   │   └── useConnections.ts   # AI insights
│   │   └── services/
│   │       ├── api.ts              # Backend communication
│   │       └── storage.ts          # Local storage handling
└── shared/
    └── types.ts                    # Common data structures
```

## Core Data Models

### Thought Model (Simplified)
```python
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class Thought(BaseModel):
    id: str
    content: str                    # Main text content
    timestamp: datetime
    media_attachments: List[str]    # Image/link references
    context_tags: List[str]         # Auto-generated tags
    ai_insights: Optional[str]      # AI-generated connections
    connection_strength: float = 0.0

class MediaItem(BaseModel):
    id: str
    type: str                       # 'image' or 'link'
    content: str                    # URL or base64 image
    extracted_text: Optional[str]   # OCR/page content
    thought_id: str
    
class Connection(BaseModel):
    source_thought_id: str
    target_thought_id: str
    connection_type: str            # 'semantic', 'temporal', 'media'
    strength: float                 # 0.0 to 1.0
    ai_reason: str                  # Why this connection exists
```

## Essential Backend Components

### 1. Thought Processor (Core Intelligence)
```python
# backend/core/thought_processor.py
import openai
from sentence_transformers import SentenceTransformer
import numpy as np

class ThoughtProcessor:
    def __init__(self):
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.thoughts_db = []
        
    async def process_thought(self, content: str) -> dict:
        """Process new thought and find connections"""
        # Generate embedding
        embedding = self.embedding_model.encode([content])[0]
        
        # Find similar thoughts
        connections = await self.find_connections(embedding, content)
        
        # Generate AI insights
        insights = await self.generate_insights(content, connections)
        
        return {
            'embedding': embedding.tolist(),
            'connections': connections,
            'insights': insights,
            'tags': self.extract_tags(content)
        }
    
    async def find_connections(self, embedding, content):
        """Find semantically similar thoughts"""
        similarities = []
        for thought in self.thoughts_db:
            similarity = np.dot(embedding, thought['embedding'])
            if similarity > 0.7:  # Threshold for relevance
                similarities.append({
                    'thought_id': thought['id'],
                    'similarity': float(similarity),
                    'content_preview': thought['content'][:100]
                })
        return sorted(similarities, key=lambda x: x['similarity'], reverse=True)[:5]
```

### 2. Media Processor (Images + Links)
```python
# backend/core/media_processor.py
import requests
from PIL import Image
import pytesseract
from bs4 import BeautifulSoup

class MediaProcessor:
    async def process_image(self, image_data: bytes) -> dict:
        """Extract text from images using OCR"""
        image = Image.open(io.BytesIO(image_data))
        extracted_text = pytesseract.image_to_string(image)
        
        return {
            'type': 'image',
            'extracted_text': extracted_text,
            'text_confidence': len(extracted_text) > 10  # Simple confidence
        }
    
    async def process_link(self, url: str) -> dict:
        """Extract content from web links"""
        try:
            response = requests.get(url, timeout=5)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract key content
            title = soup.find('title').text if soup.find('title') else ''
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            description = meta_desc['content'] if meta_desc else ''
            
            # Extract main text (simplified)
            main_text = ' '.join([p.text for p in soup.find_all('p')])[:500]
            
            return {
                'type': 'link',
                'title': title,
                'description': description,
                'content_preview': main_text,
                'url': url
            }
        except Exception as e:
            return {'type': 'link', 'url': url, 'error': str(e)}
```

### 3. Simple Database Layer
```python
# backend/database/database.py
import sqlite3
import json
from datetime import datetime

class ThoughtDatabase:
    def __init__(self, db_path: str = "thoughts.db"):
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Create tables if they don't exist"""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS thoughts (
                    id TEXT PRIMARY KEY,
                    content TEXT NOT NULL,
                    timestamp TEXT NOT NULL,
                    embedding TEXT,  -- JSON array
                    tags TEXT,       -- JSON array
                    ai_insights TEXT
                )
            """)
            
            conn.execute("""
                CREATE TABLE IF NOT EXISTS media_items (
                    id TEXT PRIMARY KEY,
                    thought_id TEXT,
                    type TEXT,       -- 'image' or 'link'
                    content TEXT,    -- URL or base64
                    extracted_text TEXT,
                    FOREIGN KEY (thought_id) REFERENCES thoughts (id)
                )
            """)
            
            conn.execute("""
                CREATE TABLE IF NOT EXISTS connections (
                    source_id TEXT,
                    target_id TEXT,
                    strength REAL,
                    connection_type TEXT,
                    ai_reason TEXT,
                    PRIMARY KEY (source_id, target_id)
                )
            """)
    
    async def save_thought(self, thought: dict) -> str:
        """Save thought and return ID"""
        thought_id = f"thought_{int(datetime.now().timestamp())}"
        
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                INSERT INTO thoughts (id, content, timestamp, embedding, tags, ai_insights)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                thought_id,
                thought['content'],
                datetime.now().isoformat(),
                json.dumps(thought.get('embedding', [])),
                json.dumps(thought.get('tags', [])),
                thought.get('ai_insights', '')
            ))
        
        return thought_id
```

## Essential Frontend Components

### 1. Main Thought Capture Interface
```tsx
// frontend/src/components/ThoughtCapture.tsx
import React, { useState, useRef } from 'react';
import { useThoughtStream } from '../hooks/useThoughtStream';

export const ThoughtCapture: React.FC = () => {
    const [content, setContent] = useState('');
    const [attachedMedia, setAttachedMedia] = useState<File[]>([]);
    const { captureThought, isProcessing } = useThoughtStream();
    
    const handleSubmit = async () => {
        if (!content.trim()) return;
        
        await captureThought({
            content,
            media: attachedMedia,
            timestamp: new Date()
        });
        
        setContent('');
        setAttachedMedia([]);
    };
    
    const handlePaste = (e: React.ClipboardEvent) => {
        // Handle pasted images and links automatically
        const items = e.clipboardData.items;
        for (let item of items) {
            if (item.type.indexOf('image') !== -1) {
                const file = item.getAsFile();
                if (file) setAttachedMedia(prev => [...prev, file]);
            }
        }
    };
    
    return (
        <div className="thought-capture">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onPaste={handlePaste}
                placeholder="What's on your mind? Paste images or links..."
                className="thought-input"
                rows={4}
            />
            
            {attachedMedia.length > 0 && (
                <div className="media-preview">
                    {attachedMedia.map((file, idx) => (
                        <div key={idx} className="media-item">
                            {file.type.startsWith('image/') ? 
                                <img src={URL.createObjectURL(file)} alt="attachment" /> :
                                <span>{file.name}</span>
                            }
                        </div>
                    ))}
                </div>
            )}
            
            <button 
                onClick={handleSubmit} 
                disabled={isProcessing}
                className="capture-button"
            >
                {isProcessing ? 'Processing...' : 'Capture Thought'}
            </button>
        </div>
    );
};
```

### 2. Connection Visualization
```tsx
// frontend/src/components/ConnectionView.tsx
import React from 'react';
import { useConnections } from '../hooks/useConnections';

export const ConnectionView: React.FC = () => {
    const { connections, insights } = useConnections();
    
    return (
        <div className="connections-panel">
            <h3>AI Insights</h3>
            
            {insights.map((insight, idx) => (
                <div key={idx} className="insight-card">
                    <div className="insight-strength">
                        Confidence: {(insight.strength * 100).toFixed(0)}%
                    </div>
                    <div className="insight-content">
                        {insight.reason}
                    </div>
                    <div className="connected-thoughts">
                        {insight.relatedThoughts.map(thought => (
                            <div key={thought.id} className="thought-preview">
                                {thought.content.substring(0, 100)}...
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
```

## API Endpoints (Minimal)

```python
# backend/api/capture.py
from fastapi import APIRouter, UploadFile, File
from typing import List

router = APIRouter()

@router.post("/thoughts")
async def capture_thought(
    content: str,
    media_files: List[UploadFile] = File(None)
):
    """Capture a new thought with optional media"""
    # Process thought content
    thought_data = await thought_processor.process_thought(content)
    
    # Process any attached media
    media_items = []
    if media_files:
        for file in media_files:
            if file.content_type.startswith('image/'):
                media_data = await media_processor.process_image(await file.read())
            else:
                # Treat as link/text
                media_data = await media_processor.process_link(content)
            media_items.append(media_data)
    
    # Save to database
    thought_id = await db.save_thought({
        'content': content,
        'embedding': thought_data['embedding'],
        'tags': thought_data['tags'],
        'ai_insights': thought_data['insights']
    })
    
    return {
        'thought_id': thought_id,
        'connections': thought_data['connections'],
        'insights': thought_data['insights']
    }

@router.get("/connections/{thought_id}")
async def get_connections(thought_id: str):
    """Get AI-discovered connections for a thought"""
    return await connection_engine.find_connections(thought_id)
```

## Installation & Setup Commands

```bash
# Backend setup
cd backend
pip install fastapi uvicorn sqlite3 sentence-transformers pillow pytesseract beautifulsoup4 requests

# Frontend setup  
cd frontend
npm install react typescript @types/react vite

# Start development
# Terminal 1: Backend
cd backend && uvicorn main:app --reload --port 8000

# Terminal 2: Frontend
cd frontend && npm run dev
```

## Core Features Delivered

✅ **Text Thought Capture** - Seamless text input with real-time processing  
✅ **Image Processing** - OCR extraction from pasted/uploaded images  
✅ **Link Analysis** - Automatic content extraction from URLs  
✅ **AI Connections** - Semantic similarity using local embeddings  
✅ **Local Storage** - SQLite database for privacy  
✅ **Real-time Insights** - Immediate AI suggestions on new thoughts  

This focused architecture gives you a working thought recorder in days, not months, while maintaining the core philosophy of seamless capture and AI-enhanced connections.
