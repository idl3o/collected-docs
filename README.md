# collected-docs

*An archive of assorted documentation gathered from one directory of coding projects, snapshotted 21/07/2025.*

This repository is a documentation dump. In July 2025 the Markdown files were swept out of a local `/coding projs` working directory and collected in one place for reference, without the code they belonged to. It is a snapshot, not a maintained project: expect drafts, status reports, planning notes, and README files written at different times and in varying states of completeness.

Almost everything here is `.md` (roughly 2,100 files). A small static web browser (`index.html`, `app.js`, `styles.css`, `sw.js`) sits at the repo root to make the collection searchable via GitHub Pages; the substance is the documents themselves, under `collected-docs/`.

## What's inside

All documentation lives under [`collected-docs/`](collected-docs/), organised by source project. Start with the master [`DOCUMENTATION-INDEX.md`](collected-docs/DOCUMENTATION-INDEX.md).

| Folder | Files (approx.) | What it holds | Related repo |
|--------|-----------------|---------------|--------------|
| [`intelligent-notes-app/`](collected-docs/intelligent-notes-app/) | ~680 | Notes/knowledge-app design docs, architecture and implementation plans, research glossaries | — |
| [`cli-project/`](collected-docs/cli-project/) | ~450 | CLI "consciousness platform" notes: feature activation reports, testing guides, simulation write-ups | — |
| [`other-projects/`](collected-docs/other-projects/) | ~840 | A grab-bag of further projects (see below) | — |
| [`cli-workspace/`](collected-docs/cli-workspace/) | ~50 | Desktop/CLI workspace docs, build and interface notes | [idl3o/cli-workspace](https://github.com/idl3o/cli-workspace) |
| [`helia-blockchain/`](collected-docs/helia-blockchain/) | ~28 | IPFS/Helia integration notes and storage architecture | — |
| [`c-r-p/`](collected-docs/c-r-p/) | ~15 | Next.js research-platform docs: roadmap, integration and redesign plans | — |
| [`human-flourishing/`](collected-docs/human-flourishing/) | ~15 | "Planetary wisdom" / civilisational-guidance writing | [idl3o/planetary-wisdom-time-capsule](https://github.com/idl3o/planetary-wisdom-time-capsule) |
| [`helia-blockchain-token/`](collected-docs/helia-blockchain-token/) | ~9 | Token-system docs built on the Helia work | [idl3o/helia-blockchain-token](https://github.com/idl3o/helia-blockchain-token) |
| [`consciousness-research/`](collected-docs/consciousness-research/) | ~7 | Core research framework notes and recovery procedures | — |

### Inside `other-projects/`

A further set of source projects, each with its own subfolder — among them:

- `w-r-a-s/` and `w-r-a-s unify/` — a web research/analysis system (README, security, Vercel deployment notes)
- `planetary-wisdom-time-capsule/` — see [idl3o/planetary-wisdom-time-capsule](https://github.com/idl3o/planetary-wisdom-time-capsule)
- `systems-creation/` — rule-based logic / language-system docs, related to [idl3o/ai-language-system-creation-tool](https://github.com/idl3o/ai-language-system-creation-tool)
- `cv-url/` — personal CV site notes, related to [idl3o/cv](https://github.com/idl3o/cv)
- `prompt-generator/`, `second-brain/`, `cli-workspace-1/`, and copies of `intelligent-notes-app`

## How it's organised

- One folder per source project under `collected-docs/`, with the original file names and subfolder layout preserved.
- `collected-docs/DOCUMENTATION-INDEX.md` is a hand-written index of the projects and their main entry points.
- Only documentation was collected; source code, `node_modules`, and build artefacts were left behind.
- The root-level `index.html` / `app.js` provide an optional searchable browser over the collection for GitHub Pages; `CLAUDE.md`, `DEPLOYMENT.md`, and `TROUBLESHOOTING.md` describe how that extraction and site were put together.

## Status

An archive / point-in-time snapshot, not an active project. The documents were true to their respective projects around July 2025 and are not being kept up to date here; some files are drafts or empty placeholders, and file counts are approximate. Treat it as a reference dump rather than authoritative current documentation. The canonical, maintained versions of the projects that still exist live in their own repositories (linked above).

---

Built by [S. Lavi](https://github.com/idl3o) · [@modsias](https://x.com/modsias)

No licence file is included; individual documents remain under whatever terms apply to their original projects.
