# 🛠️ GitHub Pages Troubleshooting Guide

## Common Issues & Solutions

### ❌ **Encoding Error: "ASCII incompatible encoding needs binmode"**

**Problem**: Jekyll encounters files with non-UTF-8 encoding
**Solution**: Use the static deployment workflow instead

#### Quick Fix:
1. **Delete the problematic workflow**:
   - Go to `.github/workflows/deploy.yml` and delete it
   - Or rename it to `deploy.yml.disabled`

2. **Use the static workflow**:
   - The `static.yml` workflow bypasses Jekyll entirely
   - It deploys your site as pure static files
   - This avoids all encoding issues

3. **Manual fix** (if you prefer Jekyll):
   ```bash
   # Find files with encoding issues
   find collected-docs -name "*.md" -exec file -i {} \; | grep -v utf-8
   
   # Convert problematic files
   iconv -f UTF-16 -t UTF-8 problematic-file.md > fixed-file.md
   mv fixed-file.md problematic-file.md
   ```

---

### ❌ **Site Not Loading / 404 Error**

**Checklist**:
- [ ] GitHub Pages is enabled in Settings → Pages
- [ ] Source is set to "Deploy from a branch"
- [ ] Branch is set to `main` (or `master`)
- [ ] Folder is set to `/ (root)`
- [ ] Wait 2-3 minutes after enabling

---

### ❌ **Workflow Fails / Build Errors**

**Quick Solutions**:

#### Option 1: Use Static Deployment (Recommended)
```yaml
# In .github/workflows/static.yml (already created)
# This bypasses Jekyll completely
```

#### Option 2: Disable GitHub Actions
1. Go to Settings → Pages
2. Change Source to "Deploy from a branch"
3. Select your branch (`main` or `master`)
4. Select folder: `/ (root)`

---

### ❌ **CSS/JS Not Loading**

**Check**:
- [ ] Files are in the root directory
- [ ] No 404 errors in browser console
- [ ] Try hard refresh (Ctrl+F5)

**Fix**:
```html
<!-- In index.html, ensure paths are relative -->
<link rel="stylesheet" href="styles.css">
<script src="app.js"></script>
```

---

### ❌ **Documentation Files Not Loading**

**Check**:
- [ ] `collected-docs/` folder is committed to git
- [ ] File paths match in `app.js`
- [ ] No special characters in filenames

**Common Fix**:
```javascript
// In app.js, check file paths are correct
const filePath = 'collected-docs/project-name/file-name.md';
```

---

## 🚀 **Deployment Options**

### **Option 1: Static Deployment (Simplest)**
✅ **Use this if you're having issues**
- Uses `static.yml` workflow
- No Jekyll processing
- No encoding issues
- Fast deployment

### **Option 2: Jekyll Deployment (Advanced)**
- Uses `deploy.yml` workflow  
- Processes markdown
- May have encoding issues
- More build steps

### **Option 3: Manual Deployment**
- Disable GitHub Actions
- Use Settings → Pages → Branch deployment
- GitHub automatically serves static files

---

## 🔧 **Current Setup Status**

### ✅ **Files Ready**
- `index.html` - Main application
- `styles.css` - Styling
- `app.js` - JavaScript functionality  
- `collected-docs/` - All documentation files
- **Fixed encoding issue** in `FIXED-README.md`

### ⚙️ **Deployment Options Available**
1. **Static workflow** (`static.yml`) - Recommended
2. **Jekyll workflow** (`deploy.yml`) - With encoding fixes
3. **Manual branch deployment** - Backup option

---

## 🎯 **Quick Recovery Steps**

If anything goes wrong:

1. **Disable current workflow**:
   ```bash
   mv .github/workflows/deploy.yml .github/workflows/deploy.yml.disabled
   ```

2. **Enable simple static deployment**:
   - The `static.yml` file is ready to use
   - Just push to trigger deployment

3. **Or use manual deployment**:
   - Settings → Pages → Source: "Deploy from a branch"
   - Branch: `main`, Folder: `/ (root)`

---

## ✅ **Success Verification**

Once deployed, your site should have:
- [x] Main page loads at `https://username.github.io/info-distillation`
- [x] Navigation sidebar works
- [x] Search functionality active
- [x] Documentation files load when clicked
- [x] Theme toggle works
- [x] Mobile responsive design

---

**🎉 If all else fails**: The static deployment option will definitely work since it just serves your files as-is without any processing!