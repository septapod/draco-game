#!/usr/bin/env node

/**
 * Draco Codex — DALL-E 3 Image Generator
 * Generates 28 8-bit pixel art illustrations for The Draco Codex.
 *
 * Usage: OPENAI_API_KEY=sk-... node generate-images.js
 *
 * Cost estimate: ~$1.12 (28 images × $0.04 each at standard quality)
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Error: OPENAI_API_KEY environment variable is required.");
  console.error("Usage: OPENAI_API_KEY=sk-... node generate-images.js");
  process.exit(1);
}

const IMAGES_DIR = path.join(__dirname, "images");
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const STYLE_PREFIX =
  "8-bit retro pixel art style, vibrant colors, black outline, nostalgic video game aesthetic, detailed sprite art,";

const images = [
  {
    filename: "hero-banner.png",
    prompt: `${STYLE_PREFIX} epic wide landscape scene with multiple colorful dragons soaring over craggy purple mountains, a golden castle in the distance, twinkling stars in a dark navy sky, dramatic clouds lit by dragon fire, fantasy adventure game title screen mood`,
  },
  {
    filename: "fire-dragon.png",
    prompt: `${STYLE_PREFIX} fierce red and orange dragon breathing a massive plume of fire, glowing ember eyes, scales shimmering with heat, standing on volcanic rock, flames reflecting off its body, powerful and intimidating pose`,
  },
  {
    filename: "water-dragon.png",
    prompt: `${STYLE_PREFIX} elegant blue dragon surrounded by swirling water currents, fins and aquatic features, deep ocean blue scales, water droplets floating around it, standing near a crystal-clear waterfall, serene yet powerful`,
  },
  {
    filename: "grass-dragon.png",
    prompt: `${STYLE_PREFIX} green dragon with leaf-like wings creating a wall of razor-sharp leaves, vine patterns on its body, emerald green scales, standing in a lush forest clearing, leaves swirling around it like a tornado`,
  },
  {
    filename: "electric-dragon.png",
    prompt: `${STYLE_PREFIX} bright yellow dragon crackling with electricity, lightning bolts arcing between its horns, glowing yellow scales, electric sparks flying from its body, standing on a stormy hilltop, dramatic lightning in background`,
  },
  {
    filename: "psychic-dragon.png",
    prompt: `${STYLE_PREFIX} purple dragon with distinctive pink stripes along its sides, glowing magenta eyes, telekinetic energy waves emanating from its head, objects floating around it, mysterious and intelligent expression, cosmic background`,
  },
  {
    filename: "spirit-dragon.png",
    prompt: `${STYLE_PREFIX} dark purple translucent ghostly dragon with a glowing gem on its forehead, spectral aura, slightly see-through body, purple energy beam shooting from forehead gem, haunted forest setting, moonlit night, ethereal and mystical`,
  },
  {
    filename: "speed-dragon.png",
    prompt: `${STYLE_PREFIX} sleek golden dragon in a dynamic running and flying pose, motion blur lines behind it, aerodynamic body, metallic gold scales gleaming, wind effects, racing through a canyon at incredible speed`,
  },
  {
    filename: "power-dragon.png",
    prompt: `${STYLE_PREFIX} majestic rainbow-colored dragon with swirling colors of every element, red orange blue green yellow purple gold all blending across its scales, powerful stance with all elements orbiting around it, cosmic energy`,
  },
  {
    filename: "thunder-cloud-dragon.png",
    prompt: `${STYLE_PREFIX} menacing dark storm dragon with lightly glowing lightning feathers, dark navy and electric blue color scheme, storm clouds swirling around it, charged particles releasing thunder and lightning, intimidating raid boss appearance, dramatic dark sky`,
  },
  {
    filename: "aloha.png",
    prompt: `${STYLE_PREFIX} friendly gray female humanoid robot character, theatrical personality, holding a holographic phone projecting a hologram, standing in front of a dragon racing stadium, robotic but expressive, futuristic yet retro design`,
  },
  {
    filename: "wonky-donkers.png",
    prompt: `${STYLE_PREFIX} bumbling comedic villain character holding pieces of cardboard, trying to disguise something, goofy expression, sneaky but incompetent look, comically obvious disguise materials, cartoon villain aesthetic`,
  },
  {
    filename: "tow-road.png",
    prompt: `${STYLE_PREFIX} giant evil flying turtle with massive wings, its shell glowing with dragon scale energy, armored and intimidating, soaring through a dimensional portal, dark and powerful, boss enemy appearance`,
  },
  {
    filename: "evil-groundhog.png",
    prompt: `${STYLE_PREFIX} very very long evil groundhog creature with small wings and a glowing shell made of dragon scale energy, comically elongated body, menacing expression, fantasy monster design, emerging from underground`,
  },
  {
    filename: "first-choice-stable.png",
    prompt: `${STYLE_PREFIX} magical stable interior filled with glowing dragon eggs of different colors, each egg has a small berry resting on top, warm inviting glow, wooden stable architecture with mystical decorations, sense of wonder and choice`,
  },
  {
    filename: "dragon-eye-amulet.png",
    prompt: `${STYLE_PREFIX} close-up of a glowing amulet artifact, a dragon eye visible inside the glowstone, golden chain, magical energy radiating from it, mysterious and powerful item, dark background making it the focal point, RPG item aesthetic`,
  },
  {
    filename: "racing-stadium.png",
    prompt: `${STYLE_PREFIX} dragon racing stadium from a wide angle, multiple dragons racing through the air above the track, a gray robot announcer on a platform, crowds cheering, trophy flashing in the middle of the race course, exciting competitive atmosphere`,
  },
  {
    filename: "keeper-transformation.png",
    prompt: `${STYLE_PREFIX} dramatic scene of a human transforming into a dragon, half-human half-dragon form, glowing amulet around their neck, magical energy swirling, transformation particles and light beams, epic climactic moment, powerful and emotional`,
  },
  {
    filename: "world-landscape.png",
    prompt: `${STYLE_PREFIX} sweeping fantasy world landscape with villages nestled in valleys, dense forests, towering mountains, multiple colorful dragons soaring through the sky, rivers winding through the terrain, warm golden hour lighting, epic sense of scale and wonder`,
  },
  {
    filename: "battle-scene.png",
    prompt: `${STYLE_PREFIX} two colorful dragons facing each other mid-air in a dramatic standoff, elemental energy swirling around them, one surrounded by fire aura and the other by water aura, competitive spirit, magical energy particles, epic fantasy sky background`,
  },
  {
    filename: "the-crystal.png",
    prompt: `${STYLE_PREFIX} close-up of a mystical crystal being held up to one eye, a dragon visible through the crystal with its powers revealed as glowing energy lines, magical refracting light, the crystal revealing hidden information, mysterious artifact aesthetic`,
  },
  {
    filename: "berry-plant.png",
    prompt: `${STYLE_PREFIX} ancient vine covered in mysterious carved markings and runes, glowing berries hanging from the branches in various colors, magical forest setting, bioluminescent glow, fantasy plant with mystical properties`,
  },
  {
    filename: "force-field.png",
    prompt: `${STYLE_PREFIX} dragon surrounded by a glowing translucent force field shield, energy attacks bouncing and reflecting off the barrier, dramatic defensive pose, crackling energy particles, dragon scale armor creating the protective bubble`,
  },
  {
    filename: "racing-trophy.png",
    prompt: `${STYLE_PREFIX} golden trophy floating mid-air in a dragon racing stadium, the trophy flashing and glowing with magical energy, confetti and sparkle effects, stadium crowd in background, triumphant competitive atmosphere, prize to be won`,
  },
  {
    filename: "dragon-eggs-closeup.png",
    prompt: `${STYLE_PREFIX} row of colorful dragon eggs each a different element color (red, blue, green, yellow, purple), each egg has a small berry resting on top, eggs glowing softly from within, magical nursery setting, sense of potential and choice`,
  },
  {
    filename: "night-scene.png",
    prompt: `${STYLE_PREFIX} moonlit dragon world at night, a Spirit dragon with glowing forehead gem flying through a starry sky, silver moonlight illuminating the landscape below, ethereal purple and silver color palette, mystical nighttime atmosphere`,
  },
  {
    filename: "draco-evil-shell.png",
    prompt: `${STYLE_PREFIX} dark dragon encased in a cracked glowing evil shell, dark purple and electric blue energy crackling from the shell, the dragon within looking tormented, mysterious evil voice represented by swirling dark energy, dramatic and ominous`,
  },
  {
    filename: "elemental-clash.png",
    prompt: `${STYLE_PREFIX} fire water and grass elements colliding in a triangle of energy, three streams of elemental power meeting at a central point creating a brilliant explosion, red flames blue water and green leaves swirling together, elemental cycle visualization`,
  },
];

async function generateImage(imageConfig) {
  const { filename, prompt } = imageConfig;
  const outputPath = path.join(IMAGES_DIR, filename);

  if (fs.existsSync(outputPath)) {
    console.log(`  Skipping ${filename} — already exists`);
    return;
  }

  console.log(`  Generating ${filename}...`);

  const body = JSON.stringify({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    quality: "standard",
    response_format: "url",
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
  const imageUrl = data.data[0].url;

  // Download the image
  await new Promise((resolve, reject) => {
    const download = (url) => {
      https.get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          download(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Download failed: ${res.statusCode}`));
          return;
        }
        const file = fs.createWriteStream(outputPath);
        res.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      }).on("error", reject);
    };
    download(imageUrl);
  });

  console.log(`  Saved ${filename}`);
}

async function main() {
  console.log("The Draco Codex — Image Generator");
  console.log(`Generating ${images.length} images to ${IMAGES_DIR}/\n`);

  for (const img of images) {
    try {
      await generateImage(img);
    } catch (err) {
      console.error(`  ERROR generating ${img.filename}: ${err.message}`);
    }
    // Small delay between requests to be polite to the API
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log("\nDone! Check the images/ directory.");
}

main();
