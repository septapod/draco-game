# Draco Game Bible — Project Status

## Current Work (Session Handoff)
<!-- Update this section at the START and END of every Claude Code session -->

**Last updated**: 2026-02-08

**Status**: Deployed and live at draco-codex.vercel.app. Cloud persistence working. TTS working with George voice + fallback.

**Last session** (2026-02-08 — Voice upgrade, image removal, transcription fixes):
- **Fix: TTS voice quality** — switched from Rachel (generic neutral female, flash model) to George (warm British storyteller, `eleven_multilingual_v2` model). Much better for fantasy narration. Style parameter added for expressiveness.
- **Fix: Transcription broken** — `formidable` v3 changed its export (object not function), causing "formidable is not a function." Replaced with zero-dependency multipart parser. Removed formidable from dependencies entirely.
- **Fix: Whisper hallucinations** — short/silent recordings caused Whisper to output "thank you", "thanks for watching", etc. Added hallucination filter (blocklist + min-length check), increased min blob size to 2KB, added 1-second minimum recording duration.
- **Removed: All game images** — stripped IMAGE_CATALOG, buildImageCatalogPrompt, parseSceneImages, and image rendering from renderNarratorFinal. The game is pure text — imagery happens in the imagination.
- **Fix: TTS autoplay** — browser autoplay policy was silently blocking `audio.play()`. Fixed by creating AudioContext on init and resuming on user gestures. Added browser-native speechSynthesis fallback.
- **Fix: Narrator brevity** — rewrote system prompt: "2-4 sentences MAX", explicit good/bad examples, "this is a spoken game played by kids." Reduced max_tokens from 1024 to 500.
- **Cleanup**: Deleted duplicate "draco-game" Vercel project. All env vars confirmed.

**Previous session** (2026-02-08 — Cloud Persistence + Image Fix):
- **Feature: Cloud persistence** — replaced localStorage save/load with Neon Postgres via new `api/adventures.js` serverless endpoint (JSONB state column, upsert via ON CONFLICT). All 6 save/load functions now async + fetch-based. Adventures sync across devices. Table auto-creates on first request.
- **Feature: Migration UI** — "Migrate to Cloud" button on load screen detects localStorage data and offers one-click upload. Clears localStorage after successful migration.
- **Fix: Broken scene images** — changed `imgEl.src = 'images/' + img.file` to `imgEl.src = '/codex/images/' + img.file` in `renderNarratorFinal()`. Images broke because `/game/{id}` URL rewrite caused relative paths to resolve to `/game/images/` instead of `/codex/images/`.

**Previous session** (2026-02-08 — Transcription Fix + TTS Fix + Unique URLs):
- **Fix: Transcription endpoint** — rewrote `api/transcribe.js` to use Node 18 built-in `File` + `FormData` (from `node:buffer`) instead of manual multipart boundary construction. The manual approach was fragile and breaking on Vercel. Still uses `formidable` for parsing the incoming upload.
- **Fix: ElevenLabs TTS** — fixed `api/speak.js`: removed unsupported `style` parameter from `voice_settings` (Flash v2.5 may reject it), switched from `/stream` endpoint to non-streaming `/text-to-speech` endpoint, replaced `response.body.getReader()` streaming with `response.arrayBuffer()` collection (more reliable in serverless), added `Content-Length` header and error logging.
- **Feature: Unique adventure URLs** — already implemented in previous session (game.js: `generateId()`, `history.replaceState('/game/{id}')`, URL-based auto-load in `init()`; vercel.json: `/game/:id` rewrite). Ready to deploy.

**Previous session** (2026-02-08 — Bug Fixes + ElevenLabs TTS):
- **Fix 1: Play button** — `initNavigation()` in `script.js` was calling `preventDefault()` on ALL nav tab clicks including the Play link (`href="game.html"`). Added early return for non-hash hrefs so external links navigate normally.
- **Fix 2: Voice capture MIME type** — replaced hardcoded `audio/webm` with fallback chain (`webm;codecs=opus` → `webm` → `mp4` → `ogg`). Fixes Safari which doesn't support webm recording. Blob type and filename extension now match detected MIME.
- **Fix 3: Voice capture race condition** — `mouseup` and `mouseleave` could both fire `stopAndTranscribe`. Fixed by clearing `isRecording` flag immediately at top of handler (before async work).
- **Fix 4: User error feedback** — mic denied, recording too short, and transcription failed now show messages in the input placeholder (auto-reset after 2.5s) instead of only logging to console.
- **Fix 5: Transcribe endpoint robustness** — rewrote `api/transcribe.js` to build multipart form-data manually with `Buffer.concat` instead of relying on `Blob`/`FormData` globals (flaky on some Vercel Node.js runtimes).
- **Fix 6: ElevenLabs TTS** — replaced browser `speechSynthesis` with ElevenLabs API for high-quality narrator voice. New `api/speak.js` endpoint. Uses "Rachel" voice (warm female narrator, `eleven_multilingual_v2` model). Voice toggle button still works.

**Previous session** (2026-02-08 — Deployment Fix):
- **Root cause**: GitHub-triggered deploys weren't including static files. CLI deploys (`npx vercel --prod`) work correctly because they upload all local files.
- **Fix 1**: Deployed directly via CLI to restore static files (144 files, 114.5MB)
- **Fix 2**: Added explicit root rewrite `/` → `/codex/index.html` in `vercel.json` (the `/:path*` wildcard didn't resolve bare `/` to `index.html`)
- **Fix 3**: Fixed `.vercel/project.json` — was accidentally linked to wrong project ("draco-game" instead of "draco") by `npx vercel ls`
- **Note**: The `buildCommand: ""` and `outputDirectory: "."` in `vercel.json` are needed for CLI deploys. GitHub-triggered deploys may still need dashboard settings to match.

**Previous session** (2026-02-08 — Game Enhancements + Deploy Fix):
- **Fixed Vercel 404** — added `buildCommand` and `outputDirectory` to `vercel.json` so static files deploy correctly
- **Fixed transcription endpoint** — rewrote `api/transcribe.js` to use `formidable` for reliable multipart parsing on Vercel
- **Removed "iPhone" reference** — changed "hologram iPhone" → "hologram communicator" in Game Bible
- **Added player selector** — dropdown in input area for multi-player games (hidden for solo)
- **Wired TTS toggle** — Voice button now toggles narrator speech on/off
- **Fixed streaming display** — no longer re-parses images or triggers TTS on every streamed chunk; `renderNarratorFinal` only called once after stream completes
- **Added CSS** — `.narrative-image`, `.save-archive`/`.save-unarchive`, `.archived-entry`, `.select-player` styles

**Previous session** (2026-02-08 — Polish + Favicon):
- **Removed "Trophy Variations" rule card** from racing section (per Aza's decision)
- **Added pixel art dragon favicon** — golden dragon head with flame, generated via gpt-image-1
  - `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` — linked in both `index.html` and `game.html`
- **Regenerated `racing-trophy.png`** — dragons now race TOWARD the blue trophy (updated prompt, side-view angle)
- **All changes committed and pushed to main** — 3 commits this session

**Previous session** (2026-02-08 — Draco Adventure Game Page):
- Built interactive game page (`codex/game.html`) — AI-narrated D&D-style adventure
- Vercel serverless API (`api/chat.js`, `api/transcribe.js`)
- Onboarding wizard, game state management, status bar, voice input, model selector

**Previous session** (2026-02-08 — More Images Everywhere):
- Generated all 19 icons via `gpt-image-1`: 7 pillar/world-rules icons + 12 item icons
- 12 item cards upgraded with pixel art icons
- 6 named dragons got portraits
- 2 racing rule cards got images

**Next up**:
- Verify that GitHub-triggered deploys (pushes to main) also include static files — if not, update Vercel dashboard settings (Output Directory → `.`, Build Command → empty)
- Test voice input (Whisper) on Chrome desktop + mobile
- Test save/load across browser sessions
- Test multi-player with player selector
- Update Google Doc to v1.4
- Further mobile testing and polish

**Decisions / constraints**:
- Minimal UI design — the game should encourage real-world play, not screen addiction
- Condensed Game Bible in system prompt (not RAG) — source is only ~12-15K tokens, no reason for retrieval complexity
- Whisper API for transcription (OpenAI key in Vercel env) rather than browser-only Web Speech API
- Neon Postgres for cloud persistence — `@neondatabase/serverless` driver, JSONB state column, auto-creates table
- Context blowouts were happening during iterative image work — see CLAUDE.md "Session Management" section for rules

---

## Project Overview
Canonical reference document for "Draco," a fantasy adventure game created by Aza Dixon. Intended for use across multiple media adaptations: tabletop game, video game, book series, video series.

## Current Status
- **GitHub Repo**: [septapod/draco-game](https://github.com/septapod/draco-game) (private)
- **Google Doc**: Fully formatted v1.3 — [View Doc](https://docs.google.com/document/d/1U43DoqDfHp86OGgNRhY5iRNt3Rluk5UmFo8U6oimE8E/edit?usp=drivesdk) (needs v1.4 update)
- **Markdown**: `DRACO_Game_Bible.md` — complete local copy (v1.4)
- **The Draco Codex**: Interactive 8-bit web experience at `codex/index.html` — v1.4 with 39 DALL-E 3 image prompts (28 existing + 11 new/replaced), 3 new elements (Universe, Cosmic, Egg), 2 locked elements (Wood, Starlight), breed dragons, Jack O'Rabbit enemy, 3 new story moments, 18 new glossary terms

## What's Done
- [x] Initial doc created from transcript (v1.0)
- [x] Full Google Doc formatting (Title, Subtitle, H1-H3, bold, italic, centered)
- [x] Added Dragon Stone Amulet, Keeper Transformation, Thunder Cloud details (v1.1)
- [x] Removed Spirit Rangers references (v1.2)
- [x] Re-formatted entire doc after v1.2 content update
- [x] Generated Markdown version
- [x] Created project folder (`~/draco-game/`)
- [x] Aza review session — incorporated 29 corrections/additions (v1.3)
- [x] Re-formatted entire Google Doc after v1.3 content update
- [x] Built "The Draco Codex" interactive 8-bit web experience (`codex/`)
  - index.html — 9 codex chapters mapped from game bible sections
  - style.css — 8-bit theme with Press Start 2P font, pixel borders, element colors
  - script.js — Apple-style scroll-triggered animations, card flips, matchup chart, glossary search
  - generate-images.js — DALL-E 3 image generation script (18 consistent 8-bit pixel art images)
  - 18 generated images in `codex/images/`

## What's Done (continued)
- [x] Polish pass: readability, images, scroll animations
  - Typography overhaul: switched body copy from "Press Start 2P" to "Space Mono" (readable monospace), increased all body text sizes from 7-10px to 12-17px range
  - Added 10 new DALL-E image prompts (world-landscape, battle-scene, the-crystal, berry-plant, force-field, racing-trophy, dragon-eggs-closeup, night-scene, draco-evil-shell, elemental-clash) and placed `<img>` tags throughout HTML
  - Replaced basic IntersectionObserver fade-in with Apple-style scroll-progress animations: continuous scroll-linked transforms, chapter title scale, image zoom settling, enhanced parallax (±40px + rotation), star parallax layers
  - Removed all scroll-linked opacity/fading effects (chapter title fade, codex title fade, section transition fade, word-by-word text reveal) — scroll animations now use transforms only, keeping all content fully readable while scrolling
  - Increased spacing: chapter padding, content max-width, component padding
  - Headings stay in "Press Start 2P" with tighter line-height; body copy uses wider line-height (2.4)
- [x] v1.4 lore update from Feb 7 Aza transcript session
  - 3 new elements: Universe, Cosmic, Egg (with Advanced badge)
  - 2 locked elements: Wood, Starlight (silhouette "???" style)
  - "1000 elements" concept and locked elements system
  - Breed Dragons mechanic (Spirit-Grass hybrid, Bree Berry taming)
  - Jack O'Rabbit enemy (skull head, clones, magnetism growth, space counter)
  - New allies: Snake Friend, The Finisher, Flash Dragon
  - 4 new items: Bree Berry, Snake Snacks, Rabbit Meat, Rabbit Skull
  - Racing: poisonous powers banned, Race Drone, trophy variations
  - Combat: Poisonous Powers, Spirit Army, Speed Atmosphere, Clone Mechanic
  - 3 new stories: Jack O'Rabbit Battle, Spirit-Grass Breed Encounter, Racing for Five Badges
  - Appearance corrections: Wonky Donkers (skinny, huge cheeks, tiny eyebrows, black hair, tan skin), Aloha (Squeakers-sister: laundry basket head, orange eyes, long neck, expandable mouth)
  - Power-Up Potion: "tastes super gross"
  - Thunder Cloud shell note: "not all have shells"
  - 11 new/replaced DALL-E 3 image prompts
  - ~18 new glossary terms
  - 4 new matchup chart entries (Universe, Cosmic, Egg, Spirit-Grass)
  - 5 new open questions

## What's Done (accessibility — v1.4.1)
- [x] WCAG AA text contrast & readability overhaul for the Codex
  - **Dark element h3 text colors** — bright overrides via `--element-text-color` CSS variable:
    - Spirit: `#D9A8FF`, Thunder Cloud: `#A9A2FF`, Universe: `#8CC8FF`, Cosmic: `#C4A8FF`, Wood: `#E8CDB0`, Starlight: `#FFFFFF`
  - **Dark element badge backgrounds** — swapped invisible dark badges for visible mid-tone backgrounds:
    - Spirit: `#9B59B6`, Thunder Cloud: `#6C63FF`, Universe: `#4A90D9`, Cosmic: `#8B6FC0`, Wood: `#A07855`
    - Universe badge text set to dark `#0f0f1a`; Grass badge text set to dark `#0f0f1a`
  - **Matchup buttons** — dark elements get `--el-text-color` overrides; active/hover state uses white text
  - **`--text-muted` brightened** from `#a0a0b0` → `#c0c0d0` (affects ~20 selectors: card notes, nav tabs, cycle captions, question cards, story themes, etc.)
  - **`.question-icon`** color from invisible `#4A0072` → bright `#C77DFF`
  - **`.secret-card h3`** and **`.transformation-info h3`** from invisible `var(--spirit)` → bright `#D9A8FF`
  - **Global font-size increase** — bumped all pixel-font and body text sizes up 0.1-0.15rem across the entire stylesheet:
    - Nav tabs: 0.55→0.75rem (desktop), 0.4→0.6rem (mobile)
    - Card front h3: 0.8→0.9rem, card back h3: 0.7→0.85rem
    - Element badges: 0.45→0.65rem, character roles: 0.45→0.6rem
    - Story toggles: 0.55→0.7rem, matchup buttons: 0.65→0.75rem
    - Cycle nodes: 0.45→0.65rem, secret/item/rule h3s: 0.6→0.75rem
    - Narrative h4s and path node h3s: 0.65→0.8rem
    - Card desc/weak/question text: 0.8→0.9rem, card notes: 0.7→0.8rem
    - Story themes, cycle captions, matchup notes: 0.75→0.85rem
  - **Locked element card fix** — moved `brightness(0.4) saturate(0.3)` filter from entire `.card-front` to only `.card-front img`, so h3 titles and badges render at full brightness
- [x] Lore correction: Spirit dragons do NOT generally crave family — the story about Brent's Spirit dragon is about one specific individual, not a species trait. Updated all 6 references across game bible and codex.
- [x] Wording fix: "Fantasy and technology" → "Magic and technology" in World Rules
- [x] Typo fix: "They breed fire" → "They breathe fire" in game bible and codex
- [x] Thunder Cloud badge changed from "Locked" to "Special / Locked"
- [x] Wood and Starlight badges changed from "Locked" to "Advanced / Locked"; removed locked-element dimming so card art is visible
- [x] Speed reclassified from Standard to Special (badge + game bible)

## What's Done (Aza feedback round — v1.4.2)
- [x] "Bree Berry" → "Breed Berry" (all files: game bible, codex HTML, script.js, transcript notes)
- [x] "Spirit Army" → "Grass Spirit Army" (all files)
- [x] "Power Breeding" → "Power Breathing" (all files)
- [x] Rabbit Skull: "summons 7 skeletons" → "summons a skeleton Dragon so you can tame it"
- [x] Universe, Cosmic, Egg badges: "Advanced" → "Advanced / Locked" (per Aza: all advanced dragons are locked)
- [x] Game bible: merged "Mentioned Elements" (Wood, Starlight) into "Advanced Elements (Locked)" section
- [x] Placed 5 previously unplaced images: spirit-grass-breed.png, flash-dragon.png, jack-o-rabbit-battle.png, race-drone-pink.png, spirit-grass-breed-encounter.png
- [x] Mobile responsiveness fix: nav tabs overflow at 480px, `.lore-text` scaled up from 0.55rem to 0.8rem, added 480px rules for badges/cards/roles
- [x] Gentle float animation on all images (scene images 4s, dragon cards 5s staggered, character portraits 4.5s). Respects `prefers-reduced-motion`.

## What's Done (visual overhaul — v1.4.3)
- [x] Background stars overhaul: 250 stars (up from 150), color variety (gold `#FFD700`, ice blue `#87CEEB`, warm orange `#FFB347`), large sparkle stars with diamond `clip-path` and `@keyframes sparkle` glow pulse, brighter base opacity 0.15
- [x] Animated GIFs: Created `animate-images.py` batch script. 39 PNGs → animated GIFs with element-themed sparkle particles (dragons get element colors, scenes get ambient twinkles, characters get subtle gleam). 10 frames, 200ms/frame, 128-color palette. Total: 21.8MB.
- [x] All image references in `index.html` swapped from `.png` → `.gif`
- [x] `.box-header-img` CSS class: cropped header images inside pixel-border boxes, responsive height variants for pillar/combat-info/rule-card/narrative-box/secret-card/info-box/custom-element-box/world-details
- [x] 20 text-only boxes now have header images: 3 pillars, World Rules, 2 element info boxes, Spirit Dragon narrative, 4 racing cards, Cheating narrative, 4 combat info boxes, 5 secret cards

## What's Done (symbolic icons + more images — v1.4.4)
- [x] Created `codex/generate-icons.js` — 19 icon prompts using `gpt-image-1` with transparent backgrounds
- [x] Generated all 19 icons (7 pillar/world + 12 item icons)
- [x] Replaced 3 pillar banner crops with centered symbolic icons (Bond, Race, Master) — 120px with golden glow
- [x] Added 4 detail icons to World Rules subsections (Biology, Society, Technology, Day/Night)
- [x] Replaced 12 item card emojis with pixel art icons (berries, crystals, candy, special berries, dragon scale, potion, turtle meat, badges, breed berry, snake snacks, rabbit meat, rabbit skull)
- [x] Added circular dragon portraits to 6 named dragons using existing GIFs
- [x] Added images to 2 empty racing rule cards (Modes: race-drone-pink, Powers Allowed: elemental-clash)
- [x] CSS: `.box-icon`, `.detail-icon`, `.item-icon-img`, `.named-dragon-portrait`, `.named-dragon-info` with responsive sizing

## What's Done (interactive game page — v2.0)
- [x] Game page (`codex/game.html`) with AI narrator using Anthropic Messages API
- [x] Vercel serverless API (`api/chat.js`) — streaming SSE proxy to Anthropic
- [x] Whisper transcription endpoint (`api/transcribe.js`) — voice input support
- [x] Onboarding wizard: welcome → player count → names → egg selection → dragon naming
- [x] Game state: save/load to localStorage, auto-save, conversation compression
- [x] Condensed Game Bible (~8K tokens) in system prompt
- [x] Rich status bar: HP, dragons, badges, items, location, turn count
- [x] AI state tracking via `<game_state>` JSON blocks
- [x] New content discovery system with toast notifications and panel
- [x] Hold-to-record mic button with Whisper transcription
- [x] Model selector (Haiku 4.5, Sonnet 4.5, Opus 4.6)
- [x] "Play" link added to codex nav bar
- [x] `vercel.json` updated with rewrites (API + static)
- [x] `package.json` with `@anthropic-ai/sdk` dependency
- [x] Minimal dark UI design — text-focused, not attention-grabbing

## What's Left
- [x] Generate new racing-trophy image (blue hologram trophy at finish line)
- [x] Regenerate Aloha + racing-stadium images with updated character design
- [ ] Deploy game page to Vercel and test end-to-end
- [ ] Test voice input (Whisper) on Chrome desktop + mobile
- [ ] Test save/load across browser sessions
- [ ] Update Google Doc to v1.4 (sync with Markdown changes)
- [ ] Future transcript sessions — incorporate new lore from Aza
- [ ] Open Questions (Section 18) — resolve as Aza provides answers
- [ ] Potential adaptations: tabletop rules, video game design doc, story outline

## Key Files
| File | Description |
|------|-------------|
| `DRACO_Game_Bible.md` | Full Markdown version of the game bible (v1.4) |
| `transcript-notes-v1.4.md` | Archived lore extraction from Feb 7 transcript |
| Google Doc (linked above) | Formatted canonical version (needs v1.4 sync) |
| `codex/index.html` | The Draco Codex interactive web experience |
| `codex/style.css` | 8-bit retro stylesheet |
| `codex/script.js` | Interactivity (scroll animations, cards, matchups, glossary) |
| `codex/game.html` | Interactive game page — AI-narrated adventures |
| `codex/game.css` | Game page styles (minimal dark theme) |
| `codex/game.js` | Game logic: chat, state, audio, onboarding, discoveries |
| `api/chat.js` | Vercel serverless — Anthropic Messages API streaming proxy |
| `api/adventures.js` | Vercel serverless — Neon Postgres CRUD for adventures |
| `api/transcribe.js` | Vercel serverless — OpenAI Whisper transcription proxy |
| `codex/generate-images.js` | DALL-E 3 image generation script (39 prompts) |
| `codex/generate-icons.js` | gpt-image-1 icon generator (7 transparent icons) |

## Version History
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-05 | Initial creation from transcript |
| 1.1 | 2026-02-05 | Added Dragon Stone Amulet, Keeper Transformation, Thunder Cloud lightning feathers |
| 1.2 | 2026-02-05 | Removed Spirit Rangers references; amulet origin left mysterious |
| 1.3 | 2026-02-05 | Aza review session: 29 changes — boss named Draco, Spirit/Ghost merged, Dragon Eye Amulet rename, crystal wing taming mechanic, Aloha robot consolidation, Evil Groundhog enemy, Draco's evil shell lore, Tow Road dimension, elemental cycle, speed/berry/race corrections |
| 1.4 | 2026-02-07 | Aza lore session: 3 new elements (Universe, Cosmic, Egg), 2 locked (Wood, Starlight), breed dragons, Jack O'Rabbit enemy, Snake Friend/Finisher allies, 4 new items, racing/combat mechanics, 3 new stories, appearance corrections (Wonky Donkers, Aloha), 11 new images |
