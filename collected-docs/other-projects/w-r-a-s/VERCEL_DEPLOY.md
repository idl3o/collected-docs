# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your WRAS code to GitHub
3. **Vercel CLI** (optional): `npm install -g vercel`

## Quick Deploy

### Method 1: Vercel Dashboard (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the Python project
5. Click "Deploy"

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel --prod
```

## Configuration

The project includes these Vercel-specific files:
- `vercel.json` - Deployment configuration
- `api/index.py` - Serverless function entry point
- `api/vercel_server.py` - Simplified FastAPI server
- `.vercelignore` - Files to exclude from deployment

## API Endpoints

Once deployed, your API will be available at:
- `https://your-project.vercel.app/` - System status
- `https://your-project.vercel.app/api/analyze` - Analyze watchlist
- `https://your-project.vercel.app/api/filter` - Filter engrams
- `https://your-project.vercel.app/api/synthesis` - Research synthesis

## Environment Variables

If you need environment variables, set them in:
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Or use `.env.local` file (not committed to git)

## Custom Domain

1. Go to your project in Vercel Dashboard
2. Settings → Domains
3. Add your custom domain

## Monitoring

- View deployment logs in Vercel Dashboard
- Function metrics and performance data
- Real-time error monitoring

## Troubleshooting

### Common Issues:

1. **Build Timeout**: Reduce dependencies in requirements.txt
2. **Function Size**: Use `.vercelignore` to exclude large files
3. **Import Errors**: Check Python path in `api/index.py`

### Support:
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- GitHub Issues: Report problems in the repository
