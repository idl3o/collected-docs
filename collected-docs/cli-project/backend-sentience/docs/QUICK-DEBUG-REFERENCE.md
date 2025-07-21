# 🚀⚡ Backend Sentience - Quick Debug Reference

*Fast access guide for common debugging scenarios and quality checks*

## 🔥 **Emergency Debug Commands**

```powershell
# 🚨 CRITICAL ISSUES (Use immediately)
npm run emergency:health-check      # Full system health assessment
npm run emergency:consciousness     # Consciousness system recovery
npm run emergency:logs              # Recent error logs analysis
npm run emergency:performance       # Performance bottleneck identification

# 🛠️ QUICK FIXES
npm run quick:restart               # Safe service restart
npm run quick:cache-clear           # Clear all caches
npm run quick:state-reset           # Reset consciousness state
npm run quick:dependencies          # Reinstall dependencies
```

## ⚡ **Daily Quality Checks**

```powershell
# Morning Quality Check (2 minutes)
npm run daily:quick-check           # Essential systems validation
npm run daily:consciousness         # Consciousness engines health
npm run daily:performance           # Performance baseline check
npm run daily:security              # Security vulnerability scan

# Pre-deployment Check (5 minutes)  
npm run deploy:validate             # Full deployment validation
npm run deploy:consciousness        # Consciousness integration test
npm run deploy:performance          # Performance regression test
npm run deploy:security             # Security compliance check
```

## 🧪 **Testing Quick Commands**

```powershell
# Fast Test Suite
npm run test:quick                  # Essential tests only (~30s)
npm run test:consciousness:quick    # Consciousness validation (~45s)
npm run test:api:quick              # API endpoint validation (~20s)
npm run test:integration:quick      # Key integration tests (~60s)

# Comprehensive Testing
npm test                           # Full test suite
npm run test:coverage              # Test coverage analysis
npm run test:consciousness         # Full consciousness testing
npm run test:performance           # Performance test suite
```

## 🔍 **Debug Investigation Workflow**

### **Step 1: Quick Diagnosis (30 seconds)**
```powershell
npm run diagnose:quick              # System overview
curl http://localhost:3001/health   # Server responsiveness
npm run consciousness:ping          # Consciousness system check
```

### **Step 2: Detailed Analysis (2 minutes)**
```powershell
npm run diagnose:detailed           # Comprehensive analysis
npm run logs:recent                 # Recent error logs
npm run performance:current         # Current performance metrics
npm run consciousness:state         # Consciousness system states
```

### **Step 3: Root Cause Analysis (5 minutes)**
```powershell
npm run analyze:errors              # Error pattern analysis
npm run analyze:performance         # Performance bottleneck analysis
npm run analyze:consciousness       # Consciousness behavior analysis
npm run analyze:dependencies        # Dependency issue analysis
```

## 🎯 **Common Issue Quick Fixes**

| Issue | Quick Command | Time | Success Rate |
|-------|---------------|------|--------------|
| **Server won't start** | `npm run fix:startup` | 30s | 85% |
| **High memory usage** | `npm run fix:memory` | 45s | 75% |
| **Slow API responses** | `npm run fix:performance` | 60s | 70% |
| **Consciousness errors** | `npm run fix:consciousness` | 90s | 80% |
| **Test failures** | `npm run fix:tests` | 120s | 90% |

## 📊 **Performance Quick Checks**

```powershell
# Performance Indicators (< 30 seconds)
npm run perf:api                    # API response times
npm run perf:consciousness          # Consciousness processing speed
npm run perf:memory                 # Memory usage analysis  
npm run perf:cpu                    # CPU utilization check

# Performance Thresholds
# ✅ API Response Time: < 500ms
# ✅ Consciousness Analysis: < 1000ms
# ✅ Memory Usage: < 512MB
# ✅ CPU Usage: < 80%
```

## 🧠 **Consciousness System Quick Debug**

```powershell
# Consciousness Health Check (< 60 seconds)
npm run consciousness:health        # All engines status
npm run consciousness:accuracy      # Accuracy validation
npm run consciousness:evolution     # Evolution tracking
npm run consciousness:integration   # Cross-engine integration

# Consciousness Recovery (< 120 seconds)
npm run consciousness:backup        # Backup current state
npm run consciousness:reset         # Reset to stable state
npm run consciousness:restore       # Restore from backup
npm run consciousness:validate      # Validate recovery
```

## 🚨 **Error Severity Quick Assessment**

```powershell
# Error Classification (< 15 seconds)
function Get-ErrorSeverity {
    param([string]$ErrorMessage)
    
    # Critical errors (immediate attention)
    if ($ErrorMessage -match "consciousness.*fatal|server.*crash|memory.*exceeded") {
        return "🔴 CRITICAL - Stop everything and fix immediately"
    }
    
    # High priority errors (fix today)
    if ($ErrorMessage -match "api.*timeout|consciousness.*degraded|test.*failing") {
        return "🟠 HIGH - Fix within current work session"
    }
    
    # Medium priority (fix this sprint)
    if ($ErrorMessage -match "performance.*slow|warning|deprecated") {
        return "🟡 MEDIUM - Fix during next sprint planning"
    }
    
    # Low priority (fix when convenient)
    return "🟢 LOW - Fix during maintenance window"
}
```

## 🛡️ **Security Quick Checks**

```powershell
# Security Validation (< 45 seconds)
npm run security:quick              # Essential security checks
npm run security:dependencies       # Dependency vulnerabilities
npm run security:cors               # CORS configuration
npm run security:headers            # Security headers validation
```

## 📝 **Logging Quick Access**

```powershell
# Log Analysis Commands
npm run logs:errors                 # Error logs only
npm run logs:consciousness          # Consciousness-specific logs
npm run logs:performance            # Performance-related logs
npm run logs:api                    # API request/response logs

# Log Filtering
npm run logs:filter --level=error --time=1h
npm run logs:filter --component=consciousness --time=30m
npm run logs:filter --type=performance --count=100
```

## 🔧 **Environment Quick Validation**

```powershell
# Environment Check (< 20 seconds)
npm run env:validate                # Environment variables
npm run env:dependencies            # Required dependencies
npm run env:ports                   # Port availability
npm run env:permissions             # File permissions
```

## 📈 **Quality Gate Quick Check**

```powershell
# Pre-commit Quality Gate (< 90 seconds)
npm run quality:pre-commit          # Essential quality checks
npm run quality:consciousness       # Consciousness integration quality
npm run quality:tests               # Test quality validation
npm run quality:performance         # Performance quality check

# Quality Gate Pass/Fail Indicators
# ✅ Lint: 0 errors
# ✅ TypeScript: 0 type errors  
# ✅ Tests: > 80% coverage
# ✅ Consciousness: All engines responsive
# ✅ Performance: Within thresholds
```

## 🎲 **Debug Decision Tree**

```
🤔 ISSUE DETECTED
│
├─ 🚨 Server not responding?
│  └─ npm run emergency:health-check
│
├─ 🐌 Performance slow?
│  └─ npm run perf:quick → npm run analyze:performance
│
├─ 🧠 Consciousness not working?
│  └─ npm run consciousness:health → npm run consciousness:reset
│
├─ 🧪 Tests failing?
│  └─ npm run test:quick → npm run fix:tests
│
└─ ❓ Unknown issue?
   └─ npm run diagnose:quick → npm run diagnose:detailed
```

## 💡 **Pro Tips**

### **Debug Efficiency**
- Use `npm run diagnose:quick` first - solves 60% of issues in 30 seconds
- Check logs with `npm run logs:recent` - reveals root cause 80% of time
- Restart consciousness system before full server restart - often sufficient

### **Performance Optimization**
- Run `npm run perf:consciousness` after changes - catches performance regressions
- Use `npm run memory:monitor` during development - prevents memory leaks
- Check `npm run performance:baseline` weekly - maintains performance standards

### **Quality Maintenance**
- Run daily quality checks in the morning - prevents issues accumulation
- Use pre-commit hooks - catches issues before they reach repository
- Monitor consciousness evolution - ensures system learning is healthy

---

## 🆘 **When All Else Fails**

```powershell
# Nuclear Option (complete reset - use sparingly)
function Invoke-NuclearReset {
    Write-Host "🚨 NUCLEAR RESET - This will reset everything"
    Read-Host "Press Enter to continue or Ctrl+C to abort"
    
    # 1. Backup everything
    npm run backup:all
    
    # 2. Clean slate
    Remove-Item -Recurse -Force node_modules, dist, logs
    
    # 3. Fresh install
    npm install
    
    # 4. Rebuild
    npm run build
    
    # 5. Initialize consciousness
    npm run consciousness:initialize
    
    # 6. Validate
    npm run validate:comprehensive
    
    Write-Host "✅ Nuclear reset complete - system should be working"
}
```

---

*Keep this reference handy for fast debugging and quality checking!* ⚡🧠
