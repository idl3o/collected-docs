# Phase 1 Implementation Plan: Agent Management System

**Timeline:** 2-3 days  
**Priority:** High  
**Impact:** +3 passing E2E tests  
**Current Status:** 13/27 tests passing → Target: 16/27 tests passing

## 🎯 Objective

Implement a complete Agent Management System with proper E2E test integration to pass the following failing tests:

- `should display agent list`
- `should create new agent` 
- `should interact with agents`

## 📋 Required Components

### 1. AgentListDisplay Component

**File:** `src/components/AgentListDisplay.tsx`

```tsx
interface Agent {
  id: string
  name: string
  type: string
  purpose: string
  status: 'active' | 'inactive'
  lastInteraction?: Date
}

interface AgentListDisplayProps {
  agents: Agent[]
  onCreateAgent: () => void
  onInteractWithAgent: (agentId: string) => void
}

const AgentListDisplay: React.FC<AgentListDisplayProps> = ({
  agents,
  onCreateAgent,
  onInteractWithAgent
}) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">🤖 Agent Management</h2>
        <button
          data-testid="create-agent-button"
          onClick={onCreateAgent}
          className="bg-consciousness-600 hover:bg-consciousness-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Create New Agent
        </button>
      </div>
      
      <div data-testid="agent-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            data-testid="agent-item"
            className="bg-slate-700/30 p-4 rounded-lg border border-slate-600/50"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
              <div className={`w-3 h-3 rounded-full ${
                agent.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
              }`}></div>
            </div>
            
            <p className="text-slate-300 text-sm mb-2">{agent.purpose}</p>
            <p className="text-slate-400 text-xs mb-4">Type: {agent.type}</p>
            
            <button
              data-testid="agent-interact-button"
              onClick={() => onInteractWithAgent(agent.id)}
              className="w-full bg-intention-600/20 hover:bg-intention-600/30 text-intention-300 px-3 py-2 rounded transition-colors"
            >
              Interact
            </button>
          </div>
        ))}
        
        {agents.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400">No agents created yet. Create your first agent to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AgentListDisplay
```

### 2. AgentCreationModal Component

**File:** `src/components/AgentCreationModal.tsx`

```tsx
interface AgentCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateAgent: (agent: Omit<Agent, 'id' | 'status'>) => void
}

const AgentCreationModal: React.FC<AgentCreationModalProps> = ({
  isOpen,
  onClose,
  onCreateAgent
}) => {
  const [formData, setFormData] = useState({
    name: '',
    purpose: '',
    type: 'consciousness-helper'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateAgent(formData)
    setFormData({ name: '', purpose: '', type: 'consciousness-helper' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        data-testid="agent-creation-modal"
        className="bg-slate-800 p-6 rounded-lg border border-slate-600 max-w-md w-full mx-4"
      >
        <h3 className="text-xl font-bold text-white mb-4">Create New Agent</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm mb-2">Agent Name</label>
            <input
              data-testid="agent-name-input"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-consciousness-500 focus:outline-none"
              placeholder="Enter agent name..."
              required
            />
          </div>
          
          <div>
            <label className="block text-slate-300 text-sm mb-2">Purpose</label>
            <input
              data-testid="agent-purpose-input"
              type="text"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-consciousness-500 focus:outline-none"
              placeholder="Describe the agent's purpose..."
              required
            />
          </div>
          
          <div>
            <label className="block text-slate-300 text-sm mb-2">Agent Type</label>
            <select
              data-testid="agent-type-select"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-consciousness-500 focus:outline-none"
            >
              <option value="consciousness-helper">Consciousness Helper</option>
              <option value="intention-analyzer">Intention Analyzer</option>
              <option value="guidance-provider">Guidance Provider</option>
              <option value="retrocausal-planner">Retrocausal Planner</option>
            </select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              data-testid="create-agent-confirm"
              type="submit"
              className="flex-1 bg-consciousness-600 hover:bg-consciousness-700 text-white px-4 py-2 rounded transition-colors"
            >
              Create Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AgentCreationModal
```

### 3. AgentChatInterface Component

**File:** `src/components/AgentChatInterface.tsx`

```tsx
interface Message {
  id: string
  sender: 'user' | 'agent'
  content: string
  timestamp: Date
}

interface AgentChatInterfaceProps {
  agent: Agent
  isOpen: boolean
  onClose: () => void
}

const AgentChatInterface: React.FC<AgentChatInterfaceProps> = ({
  agent,
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    const agentResponse: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'agent',
      content: `Hello! I'm ${agent.name}, a ${agent.type}. I'm here to help with: ${agent.purpose}. How can I assist you today?`,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage, agentResponse])
    setInputValue('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        data-testid="agent-chat-interface"
        className="bg-slate-800 rounded-lg border border-slate-600 max-w-2xl w-full mx-4 h-[600px] flex flex-col"
      >
        <div className="p-4 border-b border-slate-600 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">{agent.name}</h3>
            <p className="text-slate-400 text-sm">{agent.type}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                data-testid={message.sender === 'agent' ? 'agent-response' : 'user-message'}
                className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-consciousness-600 text-white'
                    : 'bg-slate-700 text-slate-100'
                }`}
              >
                {message.content}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-600">
          <div className="flex space-x-2">
            <input
              data-testid="agent-message-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-consciousness-500 focus:outline-none"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-consciousness-600 hover:bg-consciousness-700 text-white px-4 py-2 rounded transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AgentChatInterface
```

## 🔧 Integration Steps

### Step 1: Update AgentManagementDashboard

**File:** `src/components/AgentManagementDashboard.tsx`

```tsx
import { useState } from 'react'
import AgentListDisplay from './AgentListDisplay'
import AgentCreationModal from './AgentCreationModal'
import AgentChatInterface from './AgentChatInterface'

const AgentManagementDashboard: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Consciousness Helper',
      type: 'consciousness-helper',
      purpose: 'Help users explore consciousness and mindfulness',
      status: 'active',
      lastInteraction: new Date()
    }
  ])
  
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false)
  const [chatAgent, setChatAgent] = useState<Agent | null>(null)

  const handleCreateAgent = (agentData: Omit<Agent, 'id' | 'status'>) => {
    const newAgent: Agent = {
      ...agentData,
      id: Date.now().toString(),
      status: 'active'
    }
    setAgents(prev => [...prev, newAgent])
  }

  const handleInteractWithAgent = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId)
    if (agent) {
      setChatAgent(agent)
    }
  }

  return (
    <div>
      <AgentListDisplay
        agents={agents}
        onCreateAgent={() => setIsCreationModalOpen(true)}
        onInteractWithAgent={handleInteractWithAgent}
      />
      
      <AgentCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onCreateAgent={handleCreateAgent}
      />
      
      {chatAgent && (
        <AgentChatInterface
          agent={chatAgent}
          isOpen={!!chatAgent}
          onClose={() => setChatAgent(null)}
        />
      )}
    </div>
  )
}

export default AgentManagementDashboard
```

### Step 2: Add Required Types

**File:** `src/types/agent.ts`

```typescript
export interface Agent {
  id: string
  name: string
  type: 'consciousness-helper' | 'intention-analyzer' | 'guidance-provider' | 'retrocausal-planner'
  purpose: string
  status: 'active' | 'inactive'
  lastInteraction?: Date
}

export interface Message {
  id: string
  sender: 'user' | 'agent'
  content: string
  timestamp: Date
}
```

### Step 3: Update Imports

Add imports to existing files that reference these components.

## ✅ Testing Strategy

### Manual Testing Checklist:

1. **Agent List Display:**
   - [ ] Navigate to Agents tab
   - [ ] Verify agent list is visible with test ID `agent-list`
   - [ ] Verify agent items have test ID `agent-item`
   - [ ] Verify create button has test ID `create-agent-button`

2. **Agent Creation:**
   - [ ] Click create agent button
   - [ ] Verify modal opens with test ID `agent-creation-modal`
   - [ ] Fill in agent name (test ID: `agent-name-input`)
   - [ ] Fill in agent purpose (test ID: `agent-purpose-input`)
   - [ ] Select agent type (test ID: `agent-type-select`)
   - [ ] Click create confirm (test ID: `create-agent-confirm`)
   - [ ] Verify new agent appears in list

3. **Agent Interaction:**
   - [ ] Click interact button on an agent
   - [ ] Verify chat interface opens (test ID: `agent-chat-interface`)
   - [ ] Type message in input (test ID: `agent-message-input`)
   - [ ] Press Enter to send
   - [ ] Verify agent response appears (test ID: `agent-response`)

### E2E Test Verification:

```bash
# Run specific agent management tests
npx playwright test --grep "Agent Management" --project=chromium
```

Expected result: All 3 agent management tests should pass.

## 📊 Success Criteria

- [ ] `should display agent list` test passes
- [ ] `should create new agent` test passes  
- [ ] `should interact with agents` test passes
- [ ] All components follow established test ID patterns
- [ ] UI is responsive and accessible
- [ ] Code follows project TypeScript standards

## 🔄 Post-Implementation

### Next Steps After Phase 1:
1. Run full E2E test suite to verify no regressions
2. Update main documentation with new test count
3. Begin Phase 2: PWA Features implementation
4. Consider adding unit tests for new components

### Lessons Captured:
- Modal management patterns
- Component communication strategies  
- Test ID integration best practices
- Form handling in React with TypeScript

---

This implementation plan provides a clear roadmap to achieve +3 passing E2E tests by implementing a complete Agent Management System with proper test integration.
