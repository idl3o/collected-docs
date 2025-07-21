# 🚀 Consciousness Platform - Quick Reference Guide
**Essential Commands and Features for Daily Use**

---

## ⚡ **Quick Start (5 Minutes)**

### **Installation**
```bash
# 1. Clone and setup
git clone [repo] && cd consciousness-platform && npm install

# 2. Start PWA
cd app && npm run dev  # Open http://localhost:5174/

# 3. Install CLI
npm install -g consciousness-cli

# 4. Install VS Code Extension
cd src/extension && vsce package && code --install-extension consciousness-insights-0.1.0.vsix
```

---

## 📱 **PWA Interface - Essential Features**

### **Main Dashboard**
- **Consciousness Monitor**: Real-time consciousness level (0.0-1.0)
- **Intention Analyzer**: Enter questions, get multi-layered analysis
- **Gentle Guidance**: AI assistance with 5 different styles
- **Retrocausal Planner**: Work backwards from goals

### **Key Actions**
1. **Analyze Intention**: Type question → Click "Analyze" → Review insights
2. **Get Guidance**: Enter problem → Select style → Follow advice
3. **Create Plan**: Define goal → Set timeline → Follow pathway
4. **Track Evolution**: Monitor consciousness growth over time

---

## ⌨️ **CLI System - Essential Commands**

### **Core Commands**
```bash
# Project analysis
consciousness analyze                    # Basic project analysis
consciousness analyze ./src --depth deep # Deep analysis

# Get guidance
consciousness guide "How do I optimize performance?"
consciousness guide --interactive        # Interactive session

# Create plans
consciousness plan --goal "scalable architecture" --timeline "2 months"

# Generate code
consciousness generate --intent "authentication" --style gentle

# Evolve consciousness
consciousness evolve --consciousness-level 0.8
```

### **Natural Language Commands**
```bash
# These all work naturally:
consciousness "analyze my React project"
consciousness "help with database design"
consciousness "create microservices plan"
```

---

## 🎨 **VS Code Extension - Essential Features**

### **What You'll See**
- **CodeLens**: Consciousness scores above functions
- **Status Bar**: Current file consciousness level
- **Command Palette**: "Consciousness:" commands
- **Simulation Panel**: Real-time insights dashboard

### **Key Commands (Ctrl+Shift+P)**
```
Consciousness: Open 3D Visualizer      # Interactive 3D consciousness landscapes
Consciousness: Open Simulation Panel   # Analytics dashboard
Consciousness: Analyze Current File     # File-specific insights
Consciousness: Show Team Insights       # Collaboration features
```

### **CodeLens Example**
```javascript
// ⚡ Consciousness: 0.78 | Quality: High | 3 insights available
function processData(data) {
    // Click CodeLens for insights
}
```

---

## 🧠 **Consciousness Levels Guide**

### **Understanding Levels**
- **0.0-0.3**: Beginner - Basic pattern recognition
- **0.4-0.6**: Intermediate - Advanced insights and guidance
- **0.7-0.8**: Advanced - Predictive capabilities and team features
- **0.9-1.0**: Expert - Full consciousness-driven development

### **Evolution Tips**
- Start with level 0.3-0.5 for learning
- Use all three interfaces regularly
- Allow natural evolution (don't force high levels)
- Share insights with team for collective growth

---

## 🔧 **Common Issues & Quick Fixes**

### **PWA Issues**
```
Problem: PWA not loading
Fix: Clear browser cache, check Node.js 18+

Problem: Offline mode not working
Fix: Enable service workers in browser settings
```

### **CLI Issues**
```
Problem: Command not found
Fix: npm install -g consciousness-cli

Problem: EMFILE errors
Fix: consciousness analyze --minimal
```

### **Extension Issues**
```
Problem: CodeLens not showing
Fix: Enable in settings: "editor.codeLens": true

Problem: Extension not activating
Fix: Restart VS Code, check version 1.60+
```

---

## 🔧 **PWA Incognito/Localhost Issues**

### **PWA Not Showing in Incognito Mode**
```bash
# Common Issue: PWA features disabled in incognito/private browsing
# Solution 1: Use regular browser window (recommended)
Open in regular Chrome/Firefox window instead of incognito

# Solution 2: Enable specific flags for development
Chrome: chrome://flags/#service-worker-on-ui-thread
Firefox: about:config → dom.serviceWorkers.enabled = true

# Solution 3: Use development-specific URLs
http://localhost:5174/         # Main PWA
http://localhost:5174/?dev=1   # Development mode with enhanced debugging
```

### **Localhost Development Server Issues**
```bash
# Check if server is running
cd app && npm run dev

# If port conflicts (server shows different port):
Server running on: http://localhost:5174/  # Use this URL, not 5173

# Force specific port
npm run dev -- --port 5173

# Clear Vite cache if issues persist
rm -rf node_modules/.vite && npm run dev
```

### **Service Worker Issues in Development**
```javascript
// Open browser console (F12) and check for errors
// Look for service worker registration issues:

// Manual PWA installation in development:
1. Open http://localhost:5174/ in regular browser
2. Look for install icon in address bar
3. Or use browser menu: "Install Consciousness Platform"

// If PWA features don't work:
1. Check Application tab in DevTools
2. Clear Storage → Clear site data
3. Reload page and try again
```

### **Browser-Specific Solutions**

#### **Chrome**
```
1. Ensure you're using regular window (not incognito)
2. Go to chrome://settings/content/notifications
3. Allow notifications for localhost:5174
4. Check chrome://apps/ for installed PWA
```

#### **Firefox**
```
1. Open about:config
2. Set dom.serviceWorkers.enabled = true
3. Set dom.webnotifications.enabled = true
4. Restart browser and try again
```

#### **Edge**
```
1. Use regular window
2. Enable PWA support in edge://flags/
3. Check edge://apps/ for installations
```

---

## 💡 **Daily Workflow (Recommended)**

### **Morning Setup**
1. Start PWA for planning: `cd app && npm run dev`
2. Run project analysis: `consciousness analyze`
3. Open VS Code with consciousness extension active

### **Development Flow**
1. **Planning**: Use PWA retrocausal planner for goals
2. **Coding**: VS Code extension provides real-time insights
3. **Problem Solving**: CLI guidance for specific issues
4. **Review**: PWA dashboard for consciousness evolution tracking

### **Team Collaboration**
1. Share consciousness insights through PWA team features
2. Use collective intelligence for major decisions
3. Sync consciousness levels regularly
4. Monitor team consciousness evolution

---

## 📊 **Success Indicators**

### **Personal Metrics**
- Consciousness level increasing over time
- Faster problem-solving with AI guidance
- Improved code quality scores
- Reduced development friction

### **Team Metrics**
- Synchronized consciousness levels
- Collective intelligence >0.7
- Shared insights and learning
- Reduced communication overhead

---

## 🎯 **Pro Tips**

### **Maximizing Effectiveness**
1. **Use All Three Interfaces**: Each has unique strengths
2. **Natural Language**: CLI understands conversational commands
3. **Gradual Evolution**: Don't rush consciousness level increases
4. **Team Sharing**: Collective intelligence amplifies individual insights
5. **Regular Practice**: Daily use improves consciousness evolution

### **Performance Optimization**
1. **Large Projects**: Use `--minimal` flags for CLI
2. **Memory Usage**: Restart consciousness systems if needed
3. **Network**: Offline mode works for all core features
4. **Browser**: Chrome/Firefox work best for PWA features

---

## 🆘 **Getting Help**

### **Quick Support**
- **Documentation**: Check `/docs/` folder for detailed guides
- **Error Codes**: CONS_001-005 with specific solutions
- **Community**: GitHub issues and community forum
- **Reset**: `consciousness reset` to restore default state

### **Advanced Support**
- **Enterprise**: Professional support for teams
- **Custom Integration**: Tailored consciousness solutions
- **Training**: Team onboarding and optimization sessions

---

**🌟 You're ready to start consciousness-driven development! 🌟**

*Remember: The platform learns and evolves with you. Start with basic features and gradually explore advanced capabilities as your consciousness level grows.*

**Next Steps**: Try the daily workflow above and watch your development consciousness evolve!

---

**Quick Reference Version**: 1.0  
**For Full Documentation**: See `USER-OPERABILITY-GUIDE-JUNE-18-2025.md`
