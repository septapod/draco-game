#!/usr/bin/env node

/**
 * Draco Codex — DALL-E 3 Image Generator
 * Generates 39 8-bit pixel art illustrations for The Draco Codex.
 *
 * Usage: OPENAI_API_KEY=sk-... node generate-images.js
 *
 * Cost estimate: ~$1.56 (39 images × $0.04 each at standard quality)
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
    prompt: `${STYLE_PREFIX} gray boxy cart-like robot character standing in front of a dragon racing stadium, wide rectangular head shaped like an upside-down laundry basket or compact toolbox with rounded corners, two square glowing orange light-panel eyes, long horizontal grille strip mouth below the eyes, very very long telescoping segmented neck with ball-joint under head, large rectangular toolbox-shaped torso with open storage cavity near the top and horizontal ribbed bars, two thick bendable gray hose-segment arms with ringed joints extending from the torso cavity cycling up over the head with blocky coupler wrists and claw-fork grippers, mounted on wheels like a rolling utility cart, gray colored, smaller than a human, theatrical personality, pixel art robot character`,
  },
  {
    filename: "wonky-donkers.png",
    prompt: `${STYLE_PREFIX} goofy bumbling cartoon villain character, very skinny lanky man with enormous round puffed-out chipmunk cheeks, tiny dot eyebrows the same size as his small beady eyes, short messy black hair, warm tan skin, wearing a plain brown tunic and worn-out boots, holding flimsy pieces of cardboard trying to disguise a dragon egg, looking around nervously with a silly clueless expression, slapstick comedy character, lighthearted and funny, fantasy village background`,
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
    prompt: `${STYLE_PREFIX} dragon racing stadium from a wide angle, multiple dragons racing through the air above the track, a small gray boxy cart-like robot announcer on a platform with a rectangular toolbox head with square orange eyes and very long segmented neck, crowds cheering, trophy flashing in the middle of the race course, exciting competitive atmosphere`,
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
    prompt: `${STYLE_PREFIX} view from behind several dragons racing at high speed toward a finish line, on the other side of the finish line a blue hologram trophy floats and flickers translucently, the trophy glows with cyan-blue holographic light, stadium track stretching ahead, dramatic racing perspective, the dragons are mid-flight approaching the glowing prize`,
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
  {
    filename: "jack-o-rabbit.png",
    prompt: `${STYLE_PREFIX} giant menacing rabbit creature with a skull for a head, fuzzy rabbit body, the skull head acts as a shield, no shell on body, intimidating yet slightly comical, glowing eyes in skull sockets, standing in a grassy field, boss enemy appearance`,
  },
  {
    filename: "universe-dragon.png",
    prompt: `${STYLE_PREFIX} dragon with a microscopic universe map pattern across its entire body, tiny stars and galaxies visible on its scales, a small glowing compass on its chest, deep dark cosmic blue tones, mysterious and vast feeling, space and stars within its form`,
  },
  {
    filename: "cosmic-dragon.png",
    prompt: `${STYLE_PREFIX} dragon covered in a space map pattern, nebulae and constellations visible across its scales, deep purple and blue cosmic colors, stars and galaxies swirling on its body, ethereal and vast, different from universe dragon with more visible space imagery`,
  },
  {
    filename: "egg-dragon.png",
    prompt: `${STYLE_PREFIX} dragon with an ornate glowing egg balanced on top of its head, warm cream and gold tones, the egg is decorative and magical looking, gentle but powerful dragon, nurturing appearance, soft warm lighting, the egg pulses with magical energy`,
  },
  {
    filename: "wood-dragon.png",
    prompt: `${STYLE_PREFIX} dragon made of living wood and bark, gnarled tree trunk body with mossy patches, branch-like horns and wings made of woven branches with leaves sprouting from them, amber sap glowing in cracks of its bark skin, warm brown and forest green tones, standing in an ancient old-growth forest, roots trailing from its feet`,
  },
  {
    filename: "starlight-dragon.png",
    prompt: `${STYLE_PREFIX} radiant silver and white dragon glowing with pure starlight, its body shimmering like captured moonbeams, tiny pinpricks of light across its scales like stars in a night sky, crystalline translucent wings refracting light into prismatic beams, ethereal silver aura, floating above a mountaintop under a brilliant starry sky`,
  },
  {
    filename: "spirit-grass-breed.png",
    prompt: `${STYLE_PREFIX} hybrid dragon with ghostly translucent purple body mixed with vine and leaf patterns growing across it, green forehead gem glowing, combination of spectral spirit energy and natural grass elements, purple and green color scheme, mystical forest setting`,
  },
  {
    filename: "flash-dragon.png",
    prompt: `${STYLE_PREFIX} sleek aerodynamic racing dragon with lightning bolt patterns across its body, motion blur lines behind it, built for speed, metallic sheen, dynamic flying pose, golden and electric blue highlights, racing through a stadium track`,
  },
  {
    filename: "snake-friend.png",
    prompt: `${STYLE_PREFIX} friendly colorful snake in a forest clearing, offering small glowing snacks from its coils, warm and inviting expression, magical glowing food items, peaceful forest setting with dappled light, ally character, non-threatening and helpful`,
  },
  {
    filename: "race-drone-pink.png",
    prompt: `${STYLE_PREFIX} small hovering pink racing drone robot with tiny speakers and a holographic display, floating above a race track, glowing pink color, announcing a race countdown, futuristic yet retro design, stadium background with cheering crowds`,
  },
  {
    filename: "jack-o-rabbit-battle.png",
    prompt: `${STYLE_PREFIX} epic battle scene with a giant skull-headed rabbit creating clone copies of itself, small baby rabbit clones growing rapidly, a psychic dragon using telekinesis to throw clones into the sky toward space, dramatic action composition, magical energy effects`,
  },
  {
    filename: "spirit-grass-breed-encounter.png",
    prompt: `${STYLE_PREFIX} a rare hybrid dragon with purple ghostly body and green vine patterns being discovered in a meadow, a small glowing berry being offered to it, sense of wonder and discovery, forest edge setting, magical particles in the air`,
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
