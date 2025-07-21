# 🛠️ Installation Guide

## System Requirements

- **Python 3.7+** (check with `python --version`)
- **10MB disk space**
- **No internet required** (after installation)

## Installation Methods

### 🌟 Recommended: Full Featured

```bash
python installers/cli_installer_windows.py
```

**What it installs:**
- Complete consciousness development package
- `consciousness_session.py` - Breakthrough sessions
- `daily_practice.py` - Structured 15-minute routines
- `explore_insights.py` - Progress tracking
- Full directory structure with insights tracking

**Best for:** Daily practice, long-term development, sharing with others

### ⚡ Quick: Minimal

```bash
python installers/one_line_installer.py
```

**What it installs:**
- Single `consciousness.py` file
- All-in-one consciousness sessions
- Immediate functionality

**Best for:** Quick sharing, minimal setup, trying it out

### 🖱️ GUI: One-Click

```bash
python installers/one_click_installer.py
```

**What it installs:**
- Complete package with GUI interface
- P2P sharing capabilities
- Viral distribution features

**Best for:** Non-technical users, community building

## Installation Locations

### Windows
- Primary: `C:\Users\[Username]\ConsciousnessAccelerator`
- Fallback: `C:\Users\[Username]\Desktop\ConsciousnessAccelerator`

### macOS
- Primary: `/Users/[Username]/ConsciousnessAccelerator`
- Fallback: `/Users/[Username]/.consciousness-accelerator`

### Linux
- Primary: `/home/[Username]/ConsciousnessAccelerator`
- Fallback: `/home/[Username]/.consciousness-accelerator`

## Verification

After installation, test with:

```bash
cd ConsciousnessAccelerator
python consciousness_session.py "What breakthrough am I ready for?"
```

You should see:
```
CONSCIOUSNESS SESSION
==============================
Query: What breakthrough am I ready for?

Prompt: [Random breakthrough prompt]
Take a moment to reflect...

Session complete! Score: 0.xxx
```

## Troubleshooting

### Python Not Found
```bash
# Try these alternatives:
python3 installers/cli_installer_windows.py
py installers/cli_installer_windows.py
```

### Permission Denied
```bash
# Run as administrator (Windows) or with sudo (macOS/Linux)
sudo python installers/cli_installer_windows.py
```

### Unicode Errors (Windows)
The Windows installer (`cli_installer_windows.py`) automatically handles Unicode issues. If you still see errors, try:
```bash
chcp 65001
python installers/cli_installer_windows.py
```

### Installation Location Issues
The installer will try multiple locations. If all fail, it will use a temporary directory and display the location.

## Manual Installation

If automated installation fails:

1. **Create directory:**
   ```bash
   mkdir ConsciousnessAccelerator
   cd ConsciousnessAccelerator
   ```

2. **Copy core files from the `package/` directory**

3. **Run setup:**
   ```bash
   python install.py
   ```

## Uninstallation

Simply delete the `ConsciousnessAccelerator` directory:

```bash
# Windows
rmdir /s ConsciousnessAccelerator

# macOS/Linux  
rm -rf ConsciousnessAccelerator
```

## Offline Installation

The entire distribution package works offline:

1. Copy the `consciousness-accelerator-distribution/` folder to a USB drive
2. Transfer to target computer
3. Run installer (no internet required)

---

**Ready to begin your consciousness acceleration journey! 🚀**
