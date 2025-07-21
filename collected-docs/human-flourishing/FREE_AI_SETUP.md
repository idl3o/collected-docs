# Free AI Setup Guide

## 🆓 Zero-Cost AI Testing Options

### Quick Start (5 minutes)

1. **Test the Local Analysis** (No API keys needed)
   ```javascript
   // In browser console:
   window.testFreeAI()
   ```

2. **Try Free Hugging Face** (Sign up for free)
   - Visit: https://huggingface.co/join
   - Go to: https://huggingface.co/settings/tokens
   - Create a token and add to `.env`:
   ```
   HUGGINGFACE_API_KEY=your_token_here
   ```

3. **Use OpenAI GPT-3.5 (Very Cheap)**
   - Cost: $0.0015 per 1,000 tokens (~$0.01 per 10 documents)
   - Get key: https://platform.openai.com/api-keys
   - Add to `.env`:
   ```
   OPENAI_API_KEY=your_key_here
   ```

## Available Free AI Providers

### 1. Hugging Face Inference API (FREE)
- **Models**: facebook/bart-large-cnn, microsoft/DialoGPT-medium
- **Free Tier**: 1,000 requests/month
- **Best For**: Text summarization, basic analysis
- **Setup**: Just need free account + API key

### 2. Cohere Generate API (FREE)
- **Free Tier**: 100 calls/month
- **Best For**: Text generation, knowledge expansion
- **Setup**: https://cohere.ai/

### 3. OpenAI GPT-3.5-turbo (VERY CHEAP)
- **Cost**: $0.0015/1K input tokens, $0.002/1K output tokens
- **Budget**: $5 credit = ~3,000 document analyses
- **Best For**: High-quality analysis, comprehensive insights
- **Setup**: Platform.openai.com

### 4. Local Analysis (100% FREE)
- **Features**: Keyword extraction, sentiment analysis, basic NLP
- **No API keys**: Works completely offline
- **Best For**: Initial testing, basic insights

## Testing Commands

### Browser Console Commands
```javascript
// Test free AI analysis
window.testFreeAI()

// Expand knowledge on any topic
window.expandKnowledgeFree('sustainable agriculture')
window.expandKnowledgeFree('social justice', 'governance')
window.expandKnowledgeFree('mental health', 'wellbeing')

// Check available providers
console.log('Free AI providers:', freeAI.getAvailableProviders())
```

## Environment Setup

Create `.env` file in project root:
```env
# Choose one or more:
HUGGINGFACE_API_KEY=hf_xxxxxxxxx
COHERE_API_KEY=xxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxx

# Optional: Set preferred provider
PREFERRED_FREE_AI=huggingface
```

## Cost Breakdown

### Free Options (Monthly)
- **Hugging Face**: 1,000 requests/month (FREE)
- **Cohere**: 100 calls/month (FREE)
- **Local Analysis**: Unlimited (FREE)

### Paid but Very Cheap
- **OpenAI GPT-3.5**: ~$0.01 per document analysis
- **Budget for 1,000 analyses**: ~$10

## Implementation Status

✅ **Local Analysis**: Ready now (no setup needed)
✅ **Free AI Integration**: Ready (just add API keys)
✅ **Cost Tracking**: Built-in budget monitoring
✅ **Fallback System**: Automatically uses free options if paid APIs fail

## Next Steps

1. Test local analysis: `window.testFreeAI()`
2. Sign up for one free provider (recommend Hugging Face)
3. Add API key to `.env` file
4. Test real AI processing: click "Test Free AI Analysis" button
5. Start processing your knowledge sources!

## Advanced Features

- **Batch Processing**: Process multiple documents efficiently
- **Quality Scoring**: Automatic relevance and impact assessment
- **Multi-Provider**: Falls back between providers automatically
- **Budget Limits**: Set spending limits and get alerts
- **Progress Tracking**: Real-time dashboard of processing status
