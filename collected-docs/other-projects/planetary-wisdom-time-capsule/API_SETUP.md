# 🔑 API Setup Guide

This guide helps you configure API access for the Global Wisdom Synthesis Platform to enable live knowledge integration.

## 🚀 Quick Start (No API Keys Required)

The platform works out-of-the-box with public APIs:
- **ArXiv**: No API key required - full access to research papers
- **Semantic Scholar**: Public API with rate limits
- **Google Books**: Public API with rate limits

Simply run `npm run dev` and start synthesizing wisdom!

## 🔧 Enhanced Setup (Recommended)

For better performance and higher rate limits, add API keys:

### 1. Google Books API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the Books API
4. Create credentials (API Key)
5. Add to `development.html` or environment

### 2. Semantic Scholar API (Optional)
1. Visit [Semantic Scholar API](https://www.semanticscholar.org/product/api)
2. Request API access
3. Add your API key when received

### 3. News API (Future Enhancement)
1. Sign up at [NewsAPI.org](https://newsapi.org/)
2. Get your free API key
3. Add for real-time monitoring features

## 🛠️ Configuration Options

### Method 1: Development HTML (Recommended for testing)
Edit `development.html` and add your keys to `window.ENV`:

```javascript
window.ENV = {
  GOOGLE_BOOKS_API_KEY: 'your_api_key_here',
  SEMANTIC_SCHOLAR_API_KEY: 'your_api_key_here',
  MAX_REQUESTS_PER_MINUTE: '60'
}
```

### Method 2: Environment Variables (Production)
Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
# Edit .env with your API keys
```

## 📊 Testing API Integration

The platform includes automatic API testing:

1. Start development server: `npm run dev`
2. Open browser console
3. API tests run automatically
4. Check results in console

Manual testing:
```javascript
// In browser console
const tester = new ApiIntegrationTester()
await tester.runAllTests()
await tester.testFullSynthesis()
```

## 🎯 API Status Indicators

Monitor API status in the browser console:
- ✅ **Green**: API working with key
- 🟡 **Yellow**: Public API (rate limited)
- ❌ **Red**: API unavailable (fallback to cache)

## 🔒 Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** in production
3. **Rotate keys regularly**
4. **Monitor usage** to avoid rate limits
5. **Use HTTPS only** for API requests

## 🚨 Rate Limits & Quotas

| API | Free Tier | With Key |
|-----|-----------|----------|
| ArXiv | Unlimited | Unlimited |
| Google Books | 1,000/day | 100,000/day |
| Semantic Scholar | 100/5min | 1,000/5min |

## ⚡ Performance Tips

1. **Use API keys** for better rate limits
2. **Enable caching** to reduce API calls
3. **Adjust request limits** in configuration
4. **Monitor console** for rate limit warnings

## 🆘 Troubleshooting

### Common Issues

**"API request failed"**
- Check your API key
- Verify internet connection
- Check rate limits

**"CORS errors"**
- Some APIs require server-side proxy
- Use provided fallback mechanisms

**"Rate limit exceeded"**
- Reduce MAX_REQUESTS_PER_MINUTE
- Add API keys for higher limits
- Enable caching

### Getting Help

1. Check browser console for detailed errors
2. Run API integration tests
3. Verify API key configuration
4. Check API service status pages

## 🌟 What's Working Without Setup

Even without any API keys, you can:
- ✅ Search ArXiv research papers
- ✅ Access Semantic Scholar (limited)
- ✅ Search Google Books (limited)
- ✅ Run full wisdom synthesis
- ✅ Export time capsules
- ✅ Test all functionality

The platform gracefully falls back to cached data when APIs are unavailable, ensuring a seamless experience!