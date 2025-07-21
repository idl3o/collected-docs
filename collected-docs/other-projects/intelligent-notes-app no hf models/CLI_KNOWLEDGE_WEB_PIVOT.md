# CLI Knowledge Web Pivot

## Overview
We are pivoting from a web-based visualization and interaction model to a CLI-first approach for building, exploring, and visualizing the knowledge web. This enables:
- Fast, dependency-light workflows
- Direct, scriptable, and automatable knowledge web construction
- Immediate ASCII/Unicode visual feedback in the terminal

## Ecosystem Big Picture

The CLI Knowledge Web ecosystem is evolving into a robust, modular, and automation-friendly platform for research-driven knowledge work. Key components and their roles:

- **Persistent Knowledge Web Storage:** All knowledge web data is stored in persistent JSON files, enabling session continuity and long-term knowledge accumulation.
- **Research Library:** A dedicated directory for organizing and batch-ingesting research files, supporting scalable knowledge integration. All research files should use the `.txt` extension for maximum accessibility and compatibility.
- **CLI Ingestion Tools:** Automated and interactive tools for parsing, extracting, and approving insights from research files, with support for batch and advanced NLP (summarization, entity extraction) workflows.
- **ASCII/Unicode Visualization:** Multiple CLI tools for visualizing the knowledge web, including advanced graph layouts, clustering, and node statistics, all rendered in the terminal.
- **Export & Sync:** Mechanisms for exporting local insights and merging with a master online knowledge web, supporting distributed and collaborative workflows.
- **Automation & Scripting:** All features are scriptable and automatable, enabling efficient batch operations, integration with other tools, and reproducible research.

## Key Features

- **ASCII/Unicode Visualization:** See the knowledge web structure, clusters, and node stats directly in the CLI.
- **Session-based Editing:** Each CLI session is temporary by default, allowing for rapid prototyping and experimentation.
- **Insight Extraction:** Users can choose to export or persist insights and connections at any time, making the workflow flexible and user-driven.
- **Advanced Analysis:** Leverage graph algorithms (centrality, clustering, etc.) for deeper understanding, all from the terminal.
- **Batch Ingestion & Indexing:** Automatically process and index all research files in the research library.
- **NLP-Enhanced Ingestion:** Use advanced NLP to summarize, extract entities, and generate candidate insights from research files.
- **Export & Sync:** Export insights for backup, sharing, or syncing with a master knowledge web.
- **Standardized Research Format:** All research outputs and ingested files use the `.txt` extension, ensuring universal accessibility and easy processing.

## Workflow

1. **Start a CLI Session:** Launch the CLI tool to begin building or exploring a knowledge web.
2. **Add/Edit Insights:** Enter insights and connections interactively or via scripts.
3. **Batch Ingest Research:** Automatically or manually ingest and index research files from the research library. Only `.txt` files are processed by default.
4. **Visualize:** Use ASCII/Unicode renderers to see the web's structure and stats.
5. **Analyze:** Apply graph algorithms and NLP for deeper insight.
6. **Extract/Export/Sync:** Export or sync insights/connections for persistence, sharing, or further analysis.

## Advanced NLP Features

- **Summarization:** Automatically condenses research text into concise candidate insights using state-of-the-art NLP models (HuggingFace transformers).
- **Entity Extraction:** Identifies and displays key entities (people, places, concepts) in each research segment.
- **Topic Modeling:** Groups insights by underlying topics using machine learning (NMF), helping to cluster related knowledge.
- **Auto-Linking Suggestions:** Recommends connections between insights based on topic overlap, supporting a more interconnected knowledge web.

> All advanced NLP features are optional and will be used if the required Python packages are installed. The CLI will notify you if a feature is unavailable.

## Usage Example: Ingesting with NLP

```sh
python cli_ingest.py research_example.txt
```

- The CLI will display summaries, entities, topics, and auto-linking suggestions for each research file.
- You can review, approve, and add insights interactively.

## Requirements

- For NLP features: `pip install transformers scikit-learn`
- For color visualization: `pip install colorama`

---
*This document should be updated as the CLI knowledge web tooling evolves.*
