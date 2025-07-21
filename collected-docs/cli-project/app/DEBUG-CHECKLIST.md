# 🔧 Debugging Action Checklist
*Quick Reference for Immediate Fixes*

## ⚡ CRITICAL FIXES (Do First)

### 1. Fix App-activator.tsx Compilation Errors
- [ ] **File**: `src/App-activator.tsx`
- [ ] **Issue**: 6 TypeScript compilation errors
- [ ] **Action**: Repair syntax corruption
  ```bash
  # Test after fix:
  npm run build
  ```

### 2. Fix CLI Parsing Error  
- [ ] **File**: `cli-src/commands/analyze.js`
- [ ] **Issue**: Unterminated string constant (line 217)
- [ ] **Action**: Find and close string literal

## 🎯 HIGH PRIORITY FIXES

### 3. Type Safety Issues (45+ instances)
- [ ] Replace `(window as any)` with proper types
- [ ] Create interfaces for consciousness systems
- [ ] Type all function parameters and returns

### 4. Unused Variables (43+ instances)  
- [ ] Prefix unused params with underscore: `_param`
- [ ] Remove truly unused variables
- [ ] Update ESLint config for underscore prefix

### 5. Case Declaration Issues
- [ ] Wrap case declarations in blocks:
  ```typescript
  case 'component': {
    const result = generate()
    break
  }
  ```

## 📝 MEDIUM PRIORITY FIXES

### 6. React Hook Compliance
- [ ] Fix dependency arrays in useEffect
- [ ] Remove unused state variables
- [ ] Fix component export patterns

### 7. Async Promise Executors
- [ ] Remove async from Promise executors
- [ ] Use proper async/await patterns

## ✅ VALIDATION STEPS

### After Each Fix:
1. **Build Test**: `npm run build`
2. **Lint Check**: `npm run lint`  
3. **Bundle Size**: Check dist/ folder size

### Success Criteria:
- [ ] ✅ Build completes without errors
- [ ] ⚠️ ESLint errors < 50 (reduced from 119)
- [ ] 📦 Bundle size ~300KB maintained

## 🚀 Quick Commands

```powershell
# Full diagnostic
cd "c:\Users\Sam\Documents\coding projs\cli\app"

# Test build
npm run build

# Check lint status  
npm run lint | Measure-Object -Line

# Count TypeScript files
Get-ChildItem -Path "src" -Recurse -File | Where-Object {$_.Name -like "*.tsx" -or $_.Name -like "*.ts"} | Measure-Object

# Check bundle size
Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum
```

## 📊 Progress Tracking

### Current Status:
```
❌ Build: FAILING (6 errors)
⚠️ ESLint: ~119 errors  
📦 Bundle: N/A (build failing)
```

### Target Status:
```
✅ Build: SUCCESS
⚠️ ESLint: <20 errors
📦 Bundle: ~300KB
```

---

*Focus on critical fixes first - everything else depends on successful compilation!*
