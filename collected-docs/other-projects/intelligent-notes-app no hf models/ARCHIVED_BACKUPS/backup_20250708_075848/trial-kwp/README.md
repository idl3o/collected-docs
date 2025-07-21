# 🧪 KW-P Trial Environment
## Knowledge Web Platform - Experimental Version

This is a separate trial environment for experimenting with the Knowledge Web Platform (KW-P) without affecting the main production system.

## 📁 Trial Structure
- **Core Platform**: `trial_kwp_platform.py` - Simplified platform for testing
- **Database**: `trial_kwp.db` - Separate database for trial data
- **Config**: `trial_config.py` - Trial-specific configuration
- **Scripts**: Various testing and demonstration scripts

## 🚀 Quick Start
```bash
# Start trial platform
python trial_kwp_platform.py

# Examine trial database
python examine_trial_db.py

# Run knowledge web tests
python test_kwp_features.py
```

## 🎯 Trial Goals
1. **Test Knowledge Web Integration** - Verify insight loading and connections
2. **Experiment with Storage** - Try different storage approaches
3. **Validate Real-time Features** - Test WebSocket and streaming
4. **Performance Testing** - Measure response times and memory usage
5. **Feature Development** - Safe environment for new features

## 🔧 Trial Features
- **Isolated Database** - No impact on main system
- **Simplified Interface** - Focus on core KW-P functionality
- **Enhanced Logging** - Detailed debugging information
- **Flexible Configuration** - Easy parameter adjustments
- **Quick Reset** - Easy cleanup and restart

---

*Trial Environment - Safe experimentation with KW-P features*
