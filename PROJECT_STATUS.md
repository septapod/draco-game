# Draco Game Bible — Project Status

## Project Overview
Canonical reference document for "Draco," a fantasy adventure game created by Aza Dixon. Intended for use across multiple media adaptations: tabletop game, video game, book series, video series.

## Current Status
- **Google Doc**: Fully formatted v1.3 — [View Doc](https://docs.google.com/document/d/1U43DoqDfHp86OGgNRhY5iRNt3Rluk5UmFo8U6oimE8E/edit?usp=drivesdk)
- **Markdown**: `DRACO_Game_Bible.md` — complete local copy (v1.3)
- **The Draco Codex**: Interactive 8-bit web experience at `codex/index.html` — complete with scroll-progress transform animations (no opacity fading), 28 DALL-E 3 generated images (18 existing + 10 new prompts), readable Space Mono body font, dragon card flips, element matchup chart, story accordion, glossary search

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

## What's Left
- [ ] Run `node generate-images.js` to generate the 10 new images (requires OPENAI_API_KEY)
- [ ] Future transcript sessions — incorporate new lore from Aza
- [ ] Open Questions (Section 18) — resolve as Aza provides answers
- [ ] Potential adaptations: tabletop rules, video game design doc, story outline

## Key Files
| File | Description |
|------|-------------|
| `DRACO_Game_Bible.md` | Full Markdown version of the game bible |
| Google Doc (linked above) | Formatted canonical version |
| `codex/index.html` | The Draco Codex interactive web experience |
| `codex/style.css` | 8-bit retro stylesheet |
| `codex/script.js` | Interactivity (scroll animations, cards, matchups, glossary) |
| `codex/generate-images.js` | DALL-E 3 image generation script |

## Version History
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-05 | Initial creation from transcript |
| 1.1 | 2026-02-05 | Added Dragon Stone Amulet, Keeper Transformation, Thunder Cloud lightning feathers |
| 1.2 | 2026-02-05 | Removed Spirit Rangers references; amulet origin left mysterious |
| 1.3 | 2026-02-05 | Aza review session: 29 changes — boss named Draco, Spirit/Ghost merged, Dragon Eye Amulet rename, crystal wing taming mechanic, Aloha robot consolidation, Evil Groundhog enemy, Draco's evil shell lore, Tow Road dimension, elemental cycle, speed/berry/race corrections |
