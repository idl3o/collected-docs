# Knowledge Base Schema

This document defines the structure for our collaborative intelligence knowledge base, enabling semantic search and pattern recognition.

## Session Schema

```json
{
  "session_id": "session_20250701_143022",
  "participants": ["Sam", "GitHub Copilot"],
  "intent": "Implement collaborative intelligence logging",
  "context": "Building on symbiotic workflow foundation",
  "decisions": [
    {
      "decision": "Create enhanced session logger with learning integration",
      "rationale": "Enable real-time knowledge capture and pattern recognition",
      "architectural_impact": "extends existing async patterns",
      "alternatives_considered": ["simple logging", "external tool integration"],
      "success_metrics": ["code reusability", "pattern emergence", "decision quality"]
    }
  ],
  "patterns_used": [
    {
      "pattern": "async_class_initialization",
      "context": "Setting up collaborative intelligence logger",
      "outcome": "successful - enables non-blocking knowledge operations",
      "reusability_score": 0.9
    }
  ],
  "learnings": [
    "Embedded rationale in code comments increases architectural understanding",
    "Real-time knowledge capture enables immediate pattern suggestions",
    "Collaborative intelligence emerges from structured decision documentation"
  ],
  "architectural_evolution": {
    "changes": ["added knowledge base integration", "enhanced pattern tracking"],
    "dna_impact": "positive - strengthens symbiotic coding paradigm",
    "consistency_score": 0.95
  },
  "future_recommendations": [
    "Integrate with VS Code for real-time suggestions",
    "Add visual knowledge graph representation",
    "Implement automated pattern effectiveness analysis"
  ]
}
```

## Pattern Database Schema

```json
{
  "pattern_id": "async_class_initialization",
  "name": "Async Class Initialization",
  "description": "Initialize class with async setup methods",
  "category": "architecture",
  "origins": ["Sonnet 4 foundation"],
  "usage_count": 23,
  "success_rate": 0.91,
  "contexts": [
    {
      "context": "database connections",
      "success_rate": 0.95,
      "common_pitfalls": ["forgetting await", "blocking operations"]
    },
    {
      "context": "API integrations", 
      "success_rate": 0.88,
      "common_pitfalls": ["timeout handling", "error propagation"]
    }
  ],
  "code_template": "class AsyncComponent:\n    async def initialize(self):\n        # setup code\n        pass",
  "related_patterns": ["dependency_injection", "factory_pattern"],
  "architectural_tags": ["async", "initialization", "scalability"]
}
```

## Architectural DNA Schema

```json
{
  "version": "1.2.0",
  "last_updated": "2025-07-01T14:30:22Z",
  "core_principles": [
    "async-first architecture",
    "modular component design", 
    "explicit rationale documentation",
    "symbiotic human-AI collaboration"
  ],
  "pattern_hierarchy": {
    "foundational": ["async_patterns", "error_handling", "logging"],
    "architectural": ["component_composition", "dependency_injection"],
    "collaborative": ["decision_logging", "pattern_tracking", "knowledge_capture"]
  },
  "evolution_metrics": {
    "consistency_trend": [0.89, 0.92, 0.95],
    "pattern_adoption_rate": 0.78,
    "decision_quality_score": 0.91
  },
  "health_indicators": {
    "architectural_debt": "low",
    "pattern_fragmentation": "minimal", 
    "collaboration_effectiveness": "high"
  }
}
```

## Semantic Tags for Search

- **Intent Tags**: feature_addition, bug_fix, refactoring, optimization, documentation
- **Context Tags**: frontend, backend, database, api, ui, testing, deployment
- **Pattern Tags**: async, sync, functional, oop, reactive, imperative
- **Outcome Tags**: successful, failed, partially_successful, needs_iteration
- **Learning Tags**: architectural_insight, performance_lesson, collaboration_improvement, pattern_discovery

## Query Examples

```python
# Find sessions about dashboard development
search_sessions(intent="dashboard", context="visualization")

# Get patterns that work well for API integration
search_patterns(category="api", min_success_rate=0.8)

# Find decisions about async patterns
search_decisions(pattern="async", outcome="successful")

# Get architectural evolution insights
search_architectural_changes(timeframe="last_month", impact="positive")
```

This schema enables our collaborative intelligence system to build genuine understanding over time.
