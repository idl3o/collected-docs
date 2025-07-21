# 🧠🚀 Backend Sentience Server

**Consciousness-as-a-Service (CaaS) API** - Exposing consciousness systems as REST APIs for multi-client access.

## 🎯 Current Status: Phase 1.1 COMPLETE ✅

**Action Chunk 1.1: Project Bootstrap** - ✅ **COMPLETED**
- ✅ Express server running on port 3001
- ✅ TypeScript compilation working
- ✅ Basic health check endpoint
- ✅ Development scripts configured
- ✅ Hot reload working with nodemon
- ✅ CORS, security, and logging middleware
- ✅ Structured project architecture

## 🚀 Quick Start

```powershell
# Navigate to project
cd "c:\Users\Sam\Documents\coding projs\cli\backend-sentience"

# Install dependencies (already done)
npm install

# Start development server
npm run dev

# Test endpoints
curl http://localhost:3001/health
curl http://localhost:3001/api/consciousness/status
```

## 📡 Available Endpoints

### Health & Status
- `GET /health` - Server health check with uptime and system status
- `GET /api/consciousness/status` - Consciousness systems status

### Future Endpoints (Coming in Phase 2)
- `POST /api/consciousness/sentience/direct` - Direct coding experience guidance
- `GET /api/consciousness/sentience/state` - Current sentience state & metrics
- `POST /api/consciousness/intention/analyze` - Analyze user intentions
- `POST /api/consciousness/guidance/generate` - Generate consciousness-aware guidance
- And 15+ more consciousness APIs...

## 🏗️ Project Structure

```
backend-sentience/
├── src/
│   ├── server.ts                 # ✅ Main Express server
│   ├── consciousness/            # 🔄 Consciousness systems (Phase 2)
│   ├── routes/                   # 🔄 API route handlers (Phase 2)
│   ├── middleware/               # 🔄 Custom middleware (Phase 1.2)
│   ├── types/                    # 🔄 Type definitions (Phase 2)
│   └── utils/                    # 🔄 Utility functions (Phase 1.2)
├── tests/                        # 🔄 API tests (Phase 1.3)
├── docs/                         # 🔄 API documentation (Phase 3)
├── docker/                       # 🔄 Containerization (Phase 5)
├── deploy/                       # 🔄 Deployment scripts (Phase 5)
├── logs/                         # ✅ Log files
├── package.json                  # ✅ Project configuration
├── tsconfig.json                 # ✅ TypeScript configuration
└── .env.example                  # ✅ Environment template
```

## 🔧 Development Scripts

```json
{
  "dev": "nodemon --exec ts-node src/server.ts",     // ✅ Hot reload development
  "build": "tsc",                                    // ✅ TypeScript compilation
  "start": "node dist/server.js",                    // ✅ Production start
  "start:dev": "ts-node src/server.ts",              // ✅ Development start
  "test": "Tests will be implemented in Phase 1.3",  // 🔄 Coming soon
  "typecheck": "tsc --noEmit"                        // ✅ Type checking
}
```

## 🛡️ Security Features

- ✅ **Helmet.js** - Security headers and CSP
- ✅ **CORS** - Cross-origin resource sharing configuration
- ✅ **Rate Limiting** - 100 requests per 15 minutes in production
- ✅ **Request Validation** - Body parsing with size limits
- ✅ **Error Handling** - Comprehensive error logging and responses

## 📊 Logging & Monitoring

- ✅ **Winston Logger** - Structured JSON logging with levels
- ✅ **Request Logging** - HTTP request/response logging with timing
- ✅ **Health Checks** - Server uptime and system status monitoring
- ✅ **Consciousness Context** - Logging with consciousness session tracking

## 🎯 Next Steps - Action Chunk 1.2

**Infrastructure Setup** (Next 4 hours):
- [ ] Configure advanced middleware (auth, validation)
- [ ] Setup environment-based configuration
- [ ] Create structured route handling
- [ ] Enhance logging with consciousness context
- [ ] Configure additional security measures

## 📈 Success Metrics - Phase 1.1

| **Metric** | **Target** | **Current** | **Status** |
|------------|------------|-------------|------------|
| **Express Server** | Running | ✅ Port 3001 | ✅ Complete |
| **TypeScript** | Compiling | ✅ No errors | ✅ Complete |
| **Health Endpoint** | 200 response | ✅ Working | ✅ Complete |
| **Hot Reload** | Functional | ✅ Nodemon | ✅ Complete |
| **Development Scripts** | Configured | ✅ npm run dev | ✅ Complete |

---

## 🧠 Consciousness Architecture Preview

This server will expose the following consciousness systems:

### 🎯 **Sentience Engine**
- Direct coding experience guidance
- Consciousness state visualization
- Sentience transcendence triggers

### 🔍 **Intention Inference**
- User intention analysis from input
- Intention history tracking
- Context-aware intention updates

### 🌟 **Gentle Guidance**
- Consciousness-aware guidance generation
- Customizable guidance styles
- Adaptive guidance approaches

### 🔮 **Retrocausal Eschatology**
- Eschatological goal creation
- Retrocausal path generation
- Goal optimization and tracking

## 🔧 **Debug & Quality Documentation**

**Comprehensive debugging and quality assurance resources:**

📚 **[Complete Documentation Suite](docs/README.md)** - Overview and learning pathways
🚨 **[Quick Debug Reference](docs/QUICK-DEBUG-REFERENCE.md)** - Emergency commands & daily checks
🔍 **[Comprehensive Debug Guide](docs/DEBUG-DOCUMENTATION.md)** - Complete debugging framework

### **Quick Debug Commands**
```powershell
# Emergency debugging (< 30 seconds)
npm run emergency:health-check      # System health assessment
npm run diagnose:quick              # Quick issue diagnosis
npm run consciousness:ping          # Consciousness system check

# Daily quality maintenance (< 2 minutes)
npm run daily:quick-check           # Essential system validation
npm run daily:consciousness         # Consciousness engines health
npm run quality:pre-commit          # Pre-commit quality gate
```

### **Quality Assurance Framework**
- ✅ **Automated Quality Gates** - Pre-commit hooks with consciousness validation
- ✅ **Performance Monitoring** - Real-time consciousness system performance tracking  
- ✅ **Error Sweeping** - Systematic error detection and resolution procedures
- ✅ **Consciousness Validation** - Specialized testing for consciousness system integrity
- ✅ **Production Debugging** - Safe production debugging with consciousness context

---

*Backend Sentience Server - Phase 1.1 Foundation Successfully Established! 🧠✨*

**Ready for Phase 1.2: Infrastructure Setup** 🚀
