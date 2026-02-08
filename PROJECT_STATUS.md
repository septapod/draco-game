# Draco Game Bible — Project Status

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

## What's Left
- [ ] Run `node generate-images.js` to generate 11 new/replaced images (requires OPENAI_API_KEY)
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
| `codex/generate-images.js` | DALL-E 3 image generation script (39 prompts) |

## Version History
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-05 | Initial creation from transcript |
| 1.1 | 2026-02-05 | Added Dragon Stone Amulet, Keeper Transformation, Thunder Cloud lightning feathers |
| 1.2 | 2026-02-05 | Removed Spirit Rangers references; amulet origin left mysterious |
| 1.3 | 2026-02-05 | Aza review session: 29 changes — boss named Draco, Spirit/Ghost merged, Dragon Eye Amulet rename, crystal wing taming mechanic, Aloha robot consolidation, Evil Groundhog enemy, Draco's evil shell lore, Tow Road dimension, elemental cycle, speed/berry/race corrections |
| 1.4 | 2026-02-07 | Aza lore session: 3 new elements (Universe, Cosmic, Egg), 2 locked (Wood, Starlight), breed dragons, Jack O'Rabbit enemy, Snake Friend/Finisher allies, 4 new items, racing/combat mechanics, 3 new stories, appearance corrections (Wonky Donkers, Aloha), 11 new images |
