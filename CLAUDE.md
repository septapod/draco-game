# Draco Game — Claude Code Instructions

## Project Overview
"Draco" is a fantasy adventure game created by **Aza Dixon** (Brent's son). This repo holds the canonical game bible and **The Draco Codex** — an interactive 8-bit web experience. All lore is authored by Aza; Brent documents and builds the digital artifacts.

## Key Files
| File | Lines | Role |
|------|-------|------|
| `DRACO_Game_Bible.md` | ~730 | Full canonical lore (v1.4) — 18 sections |
| `codex/index.html` | ~1,350 | Single-page Codex app — 9 chapters |
| `codex/style.css` | ~1,725 | 8-bit retro stylesheet |
| `codex/script.js` | ~475 | Scroll animations, card flips, matchup chart, glossary search |
| `codex/generate-images.js` | ~275 | DALL-E 3 batch image generator (39 prompts) |
| `codex/images/` | 42 PNGs | 1024x1024 pixel art (~59MB total) |
| `codex/game.html` | ~130 | Interactive game page — AI-narrated adventures |
| `codex/game.css` | ~350 | Game page styles (minimal dark theme) |
| `codex/game.js` | ~600 | Game logic: chat, state, audio, onboarding, discoveries |
| `api/chat.js` | ~60 | Vercel serverless — Anthropic Messages API streaming proxy |
| `api/transcribe.js` | ~50 | Vercel serverless — OpenAI Whisper transcription proxy |
| `PROJECT_STATUS.md` | — | Detailed history, version log, what's done/left, **current work handoff** |
| `transcript-notes-v1.4.md` | ~200 | Archived raw lore extraction from Aza session |

## Codex Architecture
The Codex is a **zero-build static site** deployed on Vercel (static files served from `codex/`, API functions from `api/`).

**9 HTML Chapters**: World (`#world`), Elements (`#elements`), First Dragon (`#first-dragon`), Items (`#items`), Racing (`#racing`), Combat (`#combat`), Characters (`#characters`), Journey (`#journey`), Secrets (`#secrets`), plus title screen, glossary, footer.

**Key HTML patterns**:
- Dragon cards: `.dragon-card > .card-inner > .card-front + .card-back` (3D flip, 15 cards)
- Character cards: `.character-card > .character-portrait + .character-info` (8 characters)
- Story accordion: `.story-item > .story-toggle + .story-content` (9 stories)
- Glossary: `.glossary-entry[data-term]` (33 entries, real-time search filter)
- Element matchups: `.matchup-btn` buttons → dynamic `.matchup-result` display (13 elements)
- Scroll animations: `.scroll-reveal.fade-up|fade-left|fade-right|fade-scale` (IntersectionObserver)
- Scene images: `.scene-image` with `.scroll-zoom` for Apple-style scroll-linked transforms

**CSS element color vars**: `--fire: #FF4136`, `--water: #0074D9`, `--grass: #2ECC40`, `--electric: #FFDC00`, `--psychic: #B10DC9`, `--spirit: #4A0072`, `--speed: #FFB800`, `--thundercloud: #1B1464`, `--universe: #0D1B2A`, `--cosmic: #1B0A3C`, `--egg: #D4A574`. Dark elements have `--element-text-color` overrides for WCAG contrast.

**Typography**: `--font-pixel: "Press Start 2P"` for headings/UI, `--font-body: "Space Mono"` for body text. All sizes tuned for readability (v1.4.1).

## Working with This Project

### Content Sources
- **Game Bible** (`DRACO_Game_Bible.md`) is the canonical lore reference — always check it before adding/changing Codex content
- **Google Doc** ([link in PROJECT_STATUS.md](https://docs.google.com/document/d/1U43DoqDfHp86OGgNRhY5iRNt3Rluk5UmFo8U6oimE8E/edit)) is the formatted version — needs v1.4 sync
- New lore comes from transcripts of conversations with Aza — interpretation is expected
- When updating content, update BOTH the game bible and the Codex HTML

### Image Workflow
**Never generate images inside the conversation.** Images consume 10-50x more context than text.

1. **Update prompts** in `codex/generate-images.js` (edit the `images` array)
2. **Run generation** via `OPENAI_API_KEY=... node codex/generate-images.js` (skips existing files; ~$0.04/image)
3. **Review images** by opening the site locally or checking the files — reference by path, don't paste into chat
4. **To regenerate**: delete the specific PNG, then re-run the script
5. **To replace**: rename old file (e.g., `aloha.png` → `aloha-v1.png`), update prompt, re-run

### Editing the Codex
- HTML/CSS/JS only — no build step, no framework
- Test locally by opening `codex/index.html` in a browser
- CSS changes: check element color vars first, follow existing class naming patterns
- New dragon cards: copy an existing `.dragon-card` block, update element color, image, text
- New characters: copy a `.character-card` block, alternate `fade-left`/`fade-right`
- New glossary terms: add `.glossary-entry` with `data-term` attribute
- New matchup entries: add to `matchups` object in `script.js`

## Game Page Architecture

The game page (`codex/game.html`) is an AI-narrated interactive adventure powered by the Anthropic Messages API.

### Vercel Config
`vercel.json` uses rewrites: `/api/*` → serverless functions, `/*` → `codex/` static files. The codex continues to work at root URL.

### API Endpoints
- **`api/chat.js`** — POST with `{ model, system, messages, max_tokens }`. Streams response via SSE. Allowed models: `claude-haiku-4-5-20251001`, `claude-sonnet-4-5-20250929`, `claude-opus-4-6-20250514`. Uses `ANTHROPIC_API_KEY` env var.
- **`api/transcribe.js`** — POST with multipart form-data (audio file). Forwards to OpenAI Whisper API. Uses `OPENAI_API_KEY` env var.

### Game State
Saved to localStorage. Key schema: `draco_adventures` (index), `draco_adventure_{id}` (full state). Each state includes: players (with dragons, items, badges, HP), location, flags, conversation history, narrative summary, turn count, discoveries.

### System Prompt
Built dynamically per request from: narrator role + condensed Game Bible (~8K tokens) + current game state + narrative summary + response format instructions. AI outputs `<game_state>` JSON with each response to track state changes. AI wraps invented content in `<new_content>` tags.

### Conversation Compression
At 30+ messages, oldest messages are compressed into `narrativeSummary` (keeping most recent 20).

### Audio
Hold-to-record mic button → `MediaRecorder` API captures audio → sent to `/api/transcribe` → Whisper transcribes → text populates input for editing before send.

## Session Management — Prevent Context Blowouts

The Codex files are large (HTML 1,350 lines, CSS 1,725 lines). Iterative image work burns context fast. Follow these rules:

### Context Conservation
1. **Use subagents for heavy file reads** — push reading index.html or style.css to an Explore agent; don't read 1,000+ line files in the main conversation
2. **Read targeted line ranges** — use `offset` and `limit` params when you only need a specific section
3. **Reference images by file path** — say "check `codex/images/wonky-donkers.png`" instead of displaying images in conversation
4. **Compact after 3-4 image exchanges** — don't wait until the context limit
5. **Never paste/display generated images in conversation** — they eat 10-50x more tokens than text

### Breaking Up Work
- **Image prompt updates**: one session to edit `generate-images.js`
- **Image review**: separate session to review generated images and note fixes
- **HTML/CSS changes**: separate session for placing images and updating layout
- **Lore updates**: separate session for game bible + Codex content changes

### Session Handoff
- Always read `PROJECT_STATUS.md` "Current Work" section at session start
- Always update "Current Work" section at session end (even if not committing)
- Keep a running task list (TodoWrite or in PROJECT_STATUS.md) so any new session knows what's pending

## Current Task State
Check `PROJECT_STATUS.md` → "Current Work" section for what's in progress right now.
