# 🚀 CLI Development Setup Guide

## Overview

This guide will help you set up the development environment for building the Intelligent CLI component of the Consciousness Platform. The CLI will extend our PWA's consciousness capabilities into a powerful command-line interface.

## Prerequisites

Ensure you have the completed PWA implementation running:
- PWA build successful ✅
- Development server running on http://localhost:5178/ ✅
- Production preview available on http://localhost:4173/ ✅
- All consciousness engines operational ✅

## Quick Start

### 1. Install CLI Dependencies

```powershell
# Navigate to project root
cd "c:\Users\Sam\Documents\coding projs\cli\app"

# Install CLI development dependencies
npm install commander inquirer chalk ora figlet @types/figlet @types/inquirer
```

### 2. Create CLI Project Structure

```powershell
# Create CLI directories
mkdir cli-src
mkdir cli-src\commands
mkdir cli-src\parsers
mkdir cli-src\generators
mkdir cli-src\analyzers
mkdir cli-src\guides
mkdir cli-src\utils
mkdir bin
mkdir templates

# Create entry point
New-Item -Path "bin\consciousness.js" -ItemType File
```

### 3. Initialize CLI Entry Point

The CLI will be created at `bin/consciousness.js` with the following structure:

```javascript
#!/usr/bin/env node
import { Command } from 'commander'
import chalk from 'chalk'
import figlet from 'figlet'

// Import consciousness systems (shared with PWA)
import { IntentionInferenceEngine } from '../src/consciousness/intention-inference.js'
import { GentleGuidanceSystem } from '../src/consciousness/gentle-guidance.js'
import { RetrocausalEschatologyEngine } from '../src/consciousness/retrocausal-eschatology.js'

// ASCII art consciousness banner
console.log(chalk.cyan(figlet.textSync('Consciousness CLI', { horizontalLayout: 'fitted' })))

const program = new Command()

program
  .name('consciousness')
  .description('🧠 Consciousness-driven development CLI')
  .version('1.0.0')

// Core commands will be added here
program.parse()
```

### 4. Add CLI Scripts to Package.json

The package.json has been updated with CLI-related scripts:

```json
{
  "scripts": {
    "cli:init": "node scripts/init-cli.js",
    "cli:build": "tsc -p tsconfig.cli.json",
    "cli:dev": "node bin/consciousness.js",
    "cli:test": "node test/cli-test.js"
  }
}
```

### 5. Create TypeScript Configuration for CLI

Create `tsconfig.cli.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "ESNext",
    "target": "ES2022",
    "outDir": "./dist/cli",
    "rootDir": "./cli-src",
    "declaration": true,
    "allowSyntheticDefaultImports": true
  },
  "include": [
    "cli-src/**/*",
    "src/consciousness/**/*",
    "src/utils/**/*"
  ],
  "exclude": [
    "src/components/**/*",
    "src/assets/**/*",
    "dist/**/*",
    "node_modules/**/*"
  ]
}
```

## Development Workflow

### 1. Shared Consciousness Systems

The CLI will reuse the consciousness engines from the PWA:
- `src/consciousness/intention-inference.ts` - For natural language command parsing
- `src/consciousness/gentle-guidance.ts` - For helpful command suggestions
- `src/consciousness/retrocausal-eschatology.ts` - For goal-oriented planning
- `src/consciousness/oracle-monad.ts` - For predictive insights
- `src/consciousness/sentience-engine.ts` - For overall consciousness orchestration

### 2. CLI-Specific Components

Create CLI-specific implementations in `cli-src/`:

```
cli-src/
├── commands/
│   ├── analyze.ts          # consciousness analyze [target]
│   ├── guide.ts            # consciousness guide [question]
│   ├── generate.ts         # consciousness generate [type]
│   ├── plan.ts             # consciousness plan [goal]
│   └── evolve.ts           # consciousness evolve [aspect]
├── parsers/
│   ├── intention-parser.ts  # Natural language command parsing
│   ├── context-analyzer.ts  # Project context analysis
│   └── command-interpreter.ts # Command intention inference
├── generators/
│   ├── code-generator.ts    # AI-driven code generation
│   ├── template-engine.ts   # Template processing
│   └── project-scaffolder.ts # Project structure generation
├── analyzers/
│   ├── project-analyzer.ts  # Project structure analysis
│   ├── dependency-analyzer.ts # Dependency insights
│   └── pattern-analyzer.ts  # Code pattern recognition
├── guides/
│   ├── interactive-guide.ts # Interactive guidance sessions
│   ├── gentle-suggestions.ts # Non-invasive suggestion system
│   └── learning-path.ts     # Personalized learning recommendations
└── utils/
    ├── cli-logger.ts        # Consciousness-aware logging
    ├── state-manager.ts     # CLI state management
    └── pwa-bridge.ts        # PWA state synchronization
```

### 3. First Command Implementation

Start with the `analyze` command as it leverages existing consciousness systems:

```typescript
// cli-src/commands/analyze.ts
import chalk from 'chalk'
import ora from 'ora'
import { IntentionInferenceEngine } from '../../src/consciousness/intention-inference.js'

export async function analyzeCommand(target: string, options: any) {
  const spinner = ora(chalk.cyan('🧠 Analyzing with consciousness...')).start()
  
  const intentionEngine = new IntentionInferenceEngine()
  
  try {
    // Analyze the target (file, directory, or project)
    const analysis = await intentionEngine.analyzeDeepIntention(`analyze ${target}`)
    
    spinner.succeed(chalk.green('Analysis complete!'))
    
    console.log(chalk.blue('\n🎯 Consciousness Analysis:'))
    console.log(`Surface intent: ${analysis.surfaceIntent}`)
    console.log(`Hidden intent: ${analysis.hiddenIntent}`)
    console.log(`Confidence: ${(analysis.confidence * 100).toFixed(1)}%`)
    
  } catch (error) {
    spinner.fail(chalk.red('Analysis failed'))
    console.error(error)
  }
}
```

### 4. Testing Strategy

Create comprehensive tests for CLI functionality:

```typescript
// test/cli-test.js
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

describe('Consciousness CLI', () => {
  test('should show help when no command provided', async () => {
    const { stdout } = await execAsync('node bin/consciousness.js --help')
    expect(stdout).toContain('Consciousness-driven development CLI')
  })
  
  test('should analyze project with consciousness insights', async () => {
    const { stdout } = await execAsync('node bin/consciousness.js analyze .')
    expect(stdout).toContain('Consciousness Analysis')
  })
})
```

## Next Steps

### Immediate Actions (Week 1)
1. **Install Dependencies**: Run the npm install command above
2. **Create Directory Structure**: Set up CLI folders and files
3. **Initialize Entry Point**: Create basic CLI with commander.js
4. **Test Integration**: Ensure consciousness systems work in Node.js environment
5. **First Command**: Implement basic `consciousness analyze` command

### Week 2 Goals
1. **Command Framework**: Complete command infrastructure
2. **Intention Parsing**: Natural language command interpretation
3. **Gentle Guidance**: CLI guidance system implementation
4. **State Management**: PWA-CLI state synchronization

### Development Commands

```powershell
# Start PWA development (keep running)
npm run dev

# Initialize CLI development environment
npm run cli:init

# Build CLI components
npm run cli:build

# Test CLI in development mode
npm run cli:dev analyze .

# Run CLI tests
npm run cli:test
```

## Debugging & Troubleshooting

### Common Issues

1. **Module Import Errors**: Ensure ES modules are properly configured
2. **Consciousness Engine Compatibility**: Test Node.js vs browser differences
3. **State Synchronization**: Verify PWA-CLI communication
4. **Command Parsing**: Debug natural language interpretation

### Debugging Tools

```powershell
# Enable detailed logging
$env:DEBUG = "consciousness:*"
npm run cli:dev

# Test specific consciousness engine
node -e "import('./src/consciousness/intention-inference.js').then(m => console.log(m))"

# Check CLI command registration
npm run cli:dev --help
```

## Architecture Decisions

### Why Commander.js
- Robust command-line parsing with subcommands
- Excellent TypeScript support
- Extensible for complex consciousness-driven commands

### Why Shared Consciousness Systems
- Maintains consistency between PWA and CLI
- Avoids code duplication
- Enables state synchronization and learning

### Why Incremental Development
- Test consciousness integration early
- Build confidence with working features
- Allow for architecture adjustments based on learnings

---

*Ready to begin CLI development! The next step is to run the setup commands and start building the consciousness-driven command-line interface.*
