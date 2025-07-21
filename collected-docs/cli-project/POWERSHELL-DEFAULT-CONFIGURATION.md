# Consciousness CLI - PowerShell Default Configuration

This workspace has been configured to use PowerShell as the default terminal shell with enhanced consciousness research capabilities.

## Configuration Applied

### VS Code Settings (`.vscode/settings.json`)
- **Default Terminal**: PowerShell (`terminal.integrated.defaultProfile.windows`)
- **Shell Integration**: Enabled with history and decorations
- **Consciousness-specific file associations**: `.consciousness`, `.quantum`, `.morphic`, `.autonomy` files treated as Markdown
- **Auto-save**: Enabled for rapid iteration
- **Enhanced IntelliSense**: TypeScript/JavaScript suggestions improved
- **Custom terminal colors**: Consciousness-themed dark blue background

### VS Code Tasks (`.vscode/tasks.json`)
All tasks now use PowerShell by default:
- **Build CLI**: `npm run build` via PowerShell
- **Start Development Server**: `npm run dev` via PowerShell  
- **Run Consciousness Demo**: `node advanced-consciousness-platform.js` via PowerShell
- **PowerShell-native tasks**: 
  - List TypeScript files: `Get-ChildItem -Filter *.ts -Recurse`
  - System status: `Get-Process -Name node`
  - Monitor system resources: Background monitoring via PowerShell

### VS Code Launch Configurations (`.vscode/launch.json`)
Enhanced debugging with:
- **Debug CLI**: Launch CLI with PowerShell terminal
- **Debug Consciousness Demo**: Debug consciousness platform scripts
- **Debug Quantum Simulation**: Debug quantum demo scripts
- **Debug System Monitor**: Debug monitoring scripts

### PowerShell Profile Integration (`consciousness-powershell-profile.ps1`)
Enhanced PowerShell environment with:
- **Consciousness-aware aliases**: `consciousness`, `quantum`, `morphic`, `digital-autonomy`
- **Quick navigation**: `cdc` (consciousness), `cdd` (docs), `cda` (app), `cds` (src)
- **Demo shortcuts**: `demo`, `quantum-demo`, `morphic-demo`
- **Status command**: `status` - shows workspace health and running processes
- **Git integration**: `gc-commit` - consciousness-aware git commits
- **Enhanced prompt**: Shows consciousness CLI context and git branch

## Usage

### Automatic Activation
When you open a terminal in VS Code, it will automatically use PowerShell with consciousness enhancements.

### Manual PowerShell Profile Loading
To manually load the consciousness profile in any PowerShell session:
```powershell
. "c:\Users\Sam\Documents\coding projs\cli\consciousness-powershell-profile.ps1"
```

### Quick Commands Available
- `demo` - Run consciousness demos
- `quantum-demo` - Run quantum simulation
- `morphic-demo` - Run morphic resonance demo
- `status` - Show workspace status
- `gc-commit "message"` - Quick consciousness research commit
- `cdc`, `cdd`, `cda`, `cds` - Navigate to key directories

### Running Tasks
Use **Ctrl+Shift+P** → "Tasks: Run Task" to access PowerShell-enhanced tasks:
- Build CLI (PowerShell)
- Run Consciousness Demo (PowerShell)
- PowerShell - List TypeScript Files
- PowerShell - System Status
- Monitor System Resources (PowerShell)

## PowerShell Command Formatting

All future command suggestions from the AI will now be formatted for PowerShell by default, including:
- PowerShell-native cmdlets (`Get-ChildItem`, `New-Item`, `Start-Process`)
- Proper parameter syntax (`-Path`, `-Filter`, `-Recurse`)
- Pipeline operations optimized for PowerShell objects
- Windows-specific paths and operations

## Troubleshooting

### If PowerShell doesn't activate:
1. Restart VS Code
2. Check Terminal → Default Profile → PowerShell
3. Manually select PowerShell in terminal dropdown

### If consciousness profile doesn't load:
1. Check execution policy: `Get-ExecutionPolicy`
2. If restricted, set to RemoteSigned: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Manually source the profile: `. .\consciousness-powershell-profile.ps1`

### If tasks fail:
1. Ensure PowerShell is in PATH
2. Check task output for specific errors
3. Verify npm and node are accessible from PowerShell

---

**Status**: ✅ PowerShell Default Configuration Complete
**Next Step**: All terminal commands and task suggestions will use PowerShell syntax by default.
