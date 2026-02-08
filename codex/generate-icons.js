#!/usr/bin/env node

/**
 * Draco Codex — Symbolic Pixel Icon Generator
 * Generates pixel art icons with transparent backgrounds:
 *   - 7 Pillar & World Rules icons
 *   - 12 Item icons
 *
 * Uses gpt-image-1 model (supports transparent backgrounds).
 *
 * Usage: OPENAI_API_KEY=sk-... node generate-icons.js
 *
 * Cost estimate: ~$0.76 (19 images × ~$0.04 each)
 */

const fs = require("fs");
const path = require("path");

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Error: OPENAI_API_KEY environment variable is required.");
  console.error("Usage: OPENAI_API_KEY=sk-... node generate-icons.js");
  process.exit(1);
}

const IMAGES_DIR = path.join(__dirname, "images");
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const STYLE_PREFIX =
  "Symbolic pixel art icon, 8-bit retro game HUD emblem style, clean simple design, bold outlines, vibrant colors on transparent background, no text, centered composition,";

const icons = [
  {
    filename: "icon-bond.png",
    prompt: `${STYLE_PREFIX} two silhouettes (one human, one dragon) connected by a glowing golden heart-shaped energy link between them, warm gold and purple tones, representing deep friendship and connection`,
  },
  {
    filename: "icon-race.png",
    prompt: `${STYLE_PREFIX} a checkered racing flag waving dynamically, black and white checkers with golden staff, small speed lines behind it, representing competition and racing`,
  },
  {
    filename: "icon-master.png",
    prompt: `${STYLE_PREFIX} a golden champion crown with a glowing gemstone in the center, small sparkle effects around it, royal and powerful, representing mastery and achievement`,
  },
  {
    filename: "icon-biology.png",
    prompt: `${STYLE_PREFIX} a dragon egg with a glowing crystal embedded in its shell, the egg has warm cream and gold colors, the crystal glows blue-purple, representing dragon biology and hatching`,
  },
  {
    filename: "icon-society.png",
    prompt: `${STYLE_PREFIX} three small dragon silhouettes gathered together near a tiny castle tower, warm orange and gold tones, representing dragon society and community`,
  },
  {
    filename: "icon-technology.png",
    prompt: `${STYLE_PREFIX} a small holographic screen or display panel floating with circuit-like patterns, glowing cyan and blue, futuristic pixel art, representing technology and robotics`,
  },
  {
    filename: "icon-daynight.png",
    prompt: `${STYLE_PREFIX} a circle split in half — left side is a bright golden sun with rays, right side is a silver crescent moon with stars, representing the day and night cycle`,
  },
  // === Item Icons ===
  {
    filename: "icon-berries.png",
    prompt: `${STYLE_PREFIX} a cluster of three bright red berries on a small green vine, juicy and glowing, fantasy game collectible item style`,
  },
  {
    filename: "icon-crystals.png",
    prompt: `${STYLE_PREFIX} a glowing faceted crystal shard, blue-purple with inner light, floating with small sparkle particles around it, magical gem`,
  },
  {
    filename: "icon-candy.png",
    prompt: `${STYLE_PREFIX} a wrapped piece of candy with a swirl pattern, colorful rainbow wrapper with twisted ends, sweet treat game item`,
  },
  {
    filename: "icon-special-berries.png",
    prompt: `${STYLE_PREFIX} a single large golden glowing berry with a star-shaped highlight, rare and magical, sitting on a tiny leaf`,
  },
  {
    filename: "icon-dragon-scale.png",
    prompt: `${STYLE_PREFIX} a single iridescent dragon scale shaped like a shield, green-blue metallic surface, faintly glowing edges, protective item`,
  },
  {
    filename: "icon-potion.png",
    prompt: `${STYLE_PREFIX} a round glass potion bottle with bubbling green liquid inside, cork stopper, small skull vapor rising from the top, gross but powerful`,
  },
  {
    filename: "icon-turtle-meat.png",
    prompt: `${STYLE_PREFIX} a pixel art drumstick or piece of cooked meat on a bone, warm brown and golden colors, sizzling with tiny heat lines, food item`,
  },
  {
    filename: "icon-badges.png",
    prompt: `${STYLE_PREFIX} a shiny golden medal or badge with a star in the center on a small ribbon, achievement reward, bright yellow and orange tones`,
  },
  {
    filename: "icon-breed-berry.png",
    prompt: `${STYLE_PREFIX} a special berry split in two colors — half purple, half green — with a small heart shape in the center, hybrid taming berry`,
  },
  {
    filename: "icon-snake-snacks.png",
    prompt: `${STYLE_PREFIX} a small coiled green snake wrapped around a glowing purple orb, friendly but dangerous looking, poison power item`,
  },
  {
    filename: "icon-rabbit-meat.png",
    prompt: `${STYLE_PREFIX} a small piece of pink-red meat with a tiny bone, simple food item, warm colors with slight glow`,
  },
  {
    filename: "icon-rabbit-skull.png",
    prompt: `${STYLE_PREFIX} a small white rabbit skull with long ear bones extending upward, glowing red eye sockets, dark and magical, summoning item`,
  },
];

async function generateIcon(iconConfig) {
  const { filename, prompt } = iconConfig;
  const outputPath = path.join(IMAGES_DIR, filename);

  if (fs.existsSync(outputPath)) {
    console.log(`  Skipping ${filename} — already exists`);
    return;
  }

  console.log(`  Generating ${filename}...`);

  const body = JSON.stringify({
    model: "gpt-image-1",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    background: "transparent",
    output_format: "png",
  });

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error for ${filename}: ${response.status} — ${err}`);
  }

  const data = await response.json();

  // gpt-image-1 returns base64 data by default
  const b64Data = data.data[0].b64_json;
  const buffer = Buffer.from(b64Data, "base64");
  fs.writeFileSync(outputPath, buffer);

  console.log(`  Saved ${filename}`);
}

async function main() {
  console.log("The Draco Codex — Icon Generator");
  console.log(`Generating ${icons.length} icons to ${IMAGES_DIR}/\n`);

  for (const icon of icons) {
    try {
      await generateIcon(icon);
    } catch (err) {
      console.error(`  ERROR generating ${icon.filename}: ${err.message}`);
    }
    // Small delay between requests
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log("\nDone! Check the images/ directory.");
}

main();
