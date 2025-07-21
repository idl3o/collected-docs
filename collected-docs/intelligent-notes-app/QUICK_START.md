# Intelligent Notes App: Quick Start Guide

### 1. Install Requirements

```
pip install -r requirements.txt
```

### 2. Ingest Knowledge

```
python cli_ingest.py --input research_library/ --export-flat
```

### 3. Run Analytics & Visualization

```
python analytics_report.py
python ascii_knowledge_web.py
```

### 4. Use the Oracle (LLM-powered Guidance)

```
python oracle.py --model distilgpt2
```

### 5. Unified CLI

```
python kwp_cli.py --help
```

---

- All major workflows are CLI-first and automation-friendly.
- Persistent storage and session continuity are enabled by default.
- Advanced NLP, analytics, and LLM features are integrated.
- For large models, use GPU or remote LLM API for best performance.
- Flat JSON export is used for memory-efficient analytics/visualization.
- See SESSION_PROGRESS_20250710.md for detailed progress and next steps.
