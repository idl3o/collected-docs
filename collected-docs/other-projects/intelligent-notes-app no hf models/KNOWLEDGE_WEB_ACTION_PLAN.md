# Knowledge Web Action Plan

## Phase 1: Semantic Similarity Engine
- [x] Research and select an open-source embedding model (Sentence Transformers).
- [x] Prototype embedding generation for existing `InsightNode` content.
- [x] Store embedding vectors in each node (data model updated).
- [x] Implement cosine similarity search for node-to-node and query-to-node matching.
- [x] Replace or augment keyword-based connection logic with embedding-based connections.
- [x] Test and validate: Are surfaced connections more meaningful? (Initial validation complete)

## Phase 2: Feedback Loop Integration
- [x] Design UI/UX for user feedback (reflection checkpoints, CLI input; web UI pending).
- [x] Implement backend logic to capture and store feedback (session logs, insight ratings, reflections).
- [ ] Adjust `effectiveness_score` and connection weights based on feedback. (Planned)
- [x] Add session outcome tracking (breakthroughs, confusion, further questions via session logs).
- [ ] Enable community moderation (curation, merging, splitting insights). (Stub in place)
- [ ] Use feedback to adapt prompt templates and system evolution. (Planned)

## Phase 3: Research & Insight Expansion Pipeline
- [x] Create research session templates for structured insight logging (self-awareness, research ingestion).
- [x] Build automated ingestion/parsing for research logs and transcripts (markdown/json supported).
- [ ] Integrate AI/human validation and tagging for new insights. (Planned)
- [x] Automatically embed and connect new insights to the web.
- [ ] Track meta-research (coverage, gaps, high-connectivity areas). (Planned)
- [x] Launch open contribution portal for community research and discussion (CLI stub complete).

## Phase 4: Visualization & Community Engagement
- [x] Visualize semantic clusters and connection strengths in the UI (matplotlib/networkx prototype; web/three.js pending).
- [ ] Enable interactive exploration and navigation of the knowledge web. (Planned)
- [ ] Run community onboarding and feedback sessions. (Planned)
- [ ] Iterate on all features based on real-world use and feedback. (Ongoing)

---

## Immediate Next Steps
1. Expand feedback loop: adjust effectiveness scores and connection weights based on user/AI feedback.
2. Add moderation and meta-research tools (curation, merging, coverage tracking).
3. Implement interactive and web-based visualization (three.js, D3.js).
4. Launch community onboarding and feedback sessions.

---

*Phases 1 and 3 are largely complete. Phase 2 and 4 are in progress, with core stubs and prototypes in place. Next: deepen feedback adaptation, moderation, and visualization.*
