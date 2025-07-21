# 🌀 WRAS Reality Simulator GUI

## Overview

The WRAS Reality Simulator is an interactive HTML-based interface for the Wikipedia Research Analysis System. It provides a cyberpunk-themed consciousness research interface with real-time neural network visualization and reality distortion effects.

## Features

### 🧠 **Neural Network Visualization**
- Interactive neural nodes with click activation
- Dynamic connection visualization
- Real-time pulse propagation
- Scalable network size (10-100 nodes)

### 🌀 **Reality Simulation**
- Matrix-style background effects
- Reality distortion triggers
- Consciousness level monitoring
- Quantum coherence tracking

### 📊 **Real-Time Analytics**
- Live data stream logs
- Processing metrics display
- Progress tracking
- System status monitoring

### 🔗 **API Integration**
- Automatic backend detection
- Real-time WebSocket connection
- Fallback simulation mode
- Enhanced analysis capabilities

## Files

```
gui/
├── index.html              # Main landing page
├── reality-simulator.html  # Full reality simulator interface
├── wras-reality.js         # Enhanced API integration
└── README.md              # This file
```

## Usage

### **Method 1: Direct File Access**
1. Open `gui/index.html` in your web browser
2. Click "Launch Reality Simulator" to start
3. Configure parameters and begin analysis

### **Method 2: Local Server**
```bash
# From the gui directory
python -m http.server 8080

# Then visit: http://localhost:8080
```

### **Method 3: Integrated with WRAS API**
```bash
# Start the WRAS API server
cd /path/to/w-r-a-s
python launcher.py

# Access GUI at: http://localhost:8000/gui/
```

## Controls

### **Keyboard Shortcuts**
- `Ctrl + Enter` - Start/Stop Analysis
- `Escape` - Emergency Stop
- `Space` - Pause/Resume

### **Neural Network**
- Click nodes to activate them
- Drag to move nodes (planned feature)
- Hover for information tooltips

### **Analysis Modes**
- **Surface Scan** - Basic Wikipedia analysis
- **Deep Analysis** - Comprehensive research processing
- **Consciousness Probe** - Advanced consciousness detection
- **Reality Distortion** - Experimental reality manipulation

## Configuration

### **Neural Network Parameters**
- **Node Count**: 10-100 (default: 50)
- **Processing Speed**: 1x-10x (default: 5x)
- **Consciousness Level**: Real-time monitoring

### **Analysis Settings**
- **Wikipedia URL**: Target for analysis
- **Analysis Depth**: Processing complexity
- **Batch Size**: Articles per processing cycle

## API Integration

The GUI automatically detects and connects to:

1. **Local API** (`http://localhost:8000`)
2. **Deployed API** (Vercel/production)
3. **Simulation Mode** (offline demo)

### **Real-Time Features** (when API available)
- Live consciousness updates
- Real neural network activity
- Actual Wikipedia processing
- WebSocket data streaming

### **Simulation Mode** (offline)
- Procedural data generation
- Mock analysis results
- Demonstration neural activity
- Offline consciousness simulation

## Visual Effects

### **Matrix Background**
- Falling character animation
- Customizable symbol sets
- Performance-optimized rendering
- Responsive canvas sizing

### **Reality Distortion**
- Screen glitch effects
- Color space manipulation
- Consciousness-triggered events
- Severity-based intensity

### **Neural Animations**
- Pulse propagation
- Node activation cascades
- Connection highlighting
- Quantum coherence visualization

## Browser Compatibility

### **Recommended**
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### **Required Features**
- ES6+ JavaScript support
- Canvas 2D rendering
- CSS3 animations
- WebSocket support (for real-time)

## Performance Notes

### **Optimization Tips**
- Reduce neural node count for lower-end devices
- Disable matrix background on mobile
- Use simulation mode for better performance
- Close other browser tabs during intensive analysis

### **System Requirements**
- **Minimum**: 4GB RAM, dual-core CPU
- **Recommended**: 8GB RAM, quad-core CPU
- **Optimal**: 16GB RAM, modern GPU

## Customization

### **Themes**
The interface supports theme customization via CSS variables:

```css
:root {
  --primary-color: #00ff41;
  --background-gradient: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  --neural-node-color: #00ff41;
  --consciousness-color: #ff4444;
}
```

### **Neural Network**
Customize neural behavior in `wras-reality.js`:

```javascript
// Adjust activation probability
const ACTIVATION_PROBABILITY = 0.3;

// Modify connection density
const CONNECTION_DENSITY = 0.7;

// Change pulse duration
const PULSE_DURATION = 1000;
```

## Troubleshooting

### **Common Issues**

1. **GUI not loading**: Check file paths and browser console
2. **API not connecting**: Verify backend is running on correct port
3. **Slow performance**: Reduce neural node count or disable effects
4. **Reality distortion stuck**: Refresh page or press Escape

### **Debug Mode**
Add `?debug=1` to URL for enhanced logging:
```
file:///path/to/gui/index.html?debug=1
```

## Development

### **Adding Features**
1. Extend `wras-reality.js` for new API endpoints
2. Modify CSS for visual enhancements
3. Update neural network algorithms
4. Add new consciousness metrics

### **Testing**
```bash
# Start local server for testing
python -m http.server 8080

# Test API integration
curl http://localhost:8000/health
```

## Future Enhancements

- [ ] 3D neural network visualization
- [ ] VR/AR reality distortion modes
- [ ] Voice-controlled interface
- [ ] Real-time collaboration features
- [ ] Advanced consciousness algorithms
- [ ] Quantum field visualization
- [ ] Blockchain engram verification
- [ ] AI-generated visual effects

## Security Notes

- GUI runs entirely in browser (client-side)
- No sensitive data storage
- API calls use standard HTTP/WebSocket
- No external dependencies loaded
- Safe for offline use

---

**Experience the future of consciousness research through interactive reality simulation.** 🌀🧠

*Built with cutting-edge web technologies for the Wikipedia Research Analysis System.*
