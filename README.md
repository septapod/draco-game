# Draco

Game bible and interactive codex for **Draco**, a fantasy dragon adventure game created by Aza Dixon.

## The Draco Codex

An interactive 8-bit web experience that brings the game bible to life with pixel art, scroll animations, dragon card flips, element matchup charts, and a searchable glossary.

**To view:** Open `codex/index.html` in a browser. No build step or server required.

## Regenerating Images

The codex includes 28 DALL-E 3 generated pixel art images. To regenerate them:

```bash
export OPENAI_API_KEY=your-key-here
node codex/generate-images.js
```

## Project Structure

```
DRACO_Game_Bible.md        Full game bible (Markdown, v1.3)
codex/
  index.html               Interactive web experience
  style.css                8-bit retro theme
  script.js                Scroll animations, cards, glossary
  generate-images.js       DALL-E 3 batch generation script
  images/                  28 generated pixel art PNGs
```

## Credits

- **Aza Dixon** — Creator of Draco
- **Brent Dixon** — Documenter and codex developer
