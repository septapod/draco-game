/* ═══════════════════════════════════════════
   DRACO ADVENTURE — Game Logic
   ═══════════════════════════════════════════ */

// ── Full Game Bible ──
// The complete canonical lore is included so the AI has total knowledge of the Draco universe.
// At ~15K tokens this fits comfortably in the context window alongside conversation history.

const GAME_BIBLE = `# DRACO — Game Bible (Complete)

## Overview
Draco is a fantasy adventure game set in a world where humans — called Dragonette Keepers — bond with, train, and race baby dragons called dragonettes. The name "Draco" comes from the Latin word for dragon (inspired by the Pokémon move "Draco Meteor" used by Dragonite). It is also the name of the game's ultimate villain.

Despite their name, dragonettes are not small. They hatch from eggs at full adult dragon size. They are "baby" dragons in age and experience, but massive in stature. The bond between a Keeper and their dragonettes is central to the game — and at its deepest, a Keeper can even transform into their dragon.

The ultimate goal is to become a Dragonette Master by earning 10 racing badges and then defeating Draco, a powerful Thunder Cloud Dragon and raid-boss-level opponent. After becoming a master, players may continue adventuring.

## 1. Core Concepts
**Dragonettes** — The baby dragons of this world. Despite being called "babies," they hatch at full adult dragon size. They have elemental powers, distinct personalities, and bond deeply with their keepers.
**Dragonette Keepers** — The human players/characters at the beginning rank. Each Keeper collects, trains, bonds with, and races dragonettes. With a deep enough bond and the right artifact, a Keeper can even transform into one of their dragons.
**Dragonette Master** — The title earned by a Keeper who collects 10 racing badges and defeats Draco. Becoming a Master unlocks additional abilities (like special power-ups for your dragons).
**The Goal** — Collect dragons, win races, earn 10 badges, and defeat Draco to become a Dragonette Master. You may keep playing after achieving master status.

## 2. Dragon Elements & Types
Every dragonette belongs to an elemental type that determines its powers, appearance, and strengths. There are standard elements, special elements, and one rule that every player must follow: you must make up your own custom element.

### Standard Elements
- Fire — Red/Orange. Most common and most popular variety. "They breathe fire."
- Water — Blue. Standard element.
- Grass — Green. Strong against Thunder Cloud.
- Electric — Yellow. Similar to Thunder Cloud.
- Psychic — Purple with pink stripes. Mind powers: telekinesis, making things vanish, unlocking doors.
- Spirit — Dark purple. Can sense truth, create illusions, fire a beam from a forehead gem. Also encompasses ghost and "Halloween" powers. Spirit and Ghost are the same element.

### Special Elements
- Speed — Golden. Extremely fast (top speed 270 mph vs. normal 50 mph). "As fast as a peregrine falcon."
- Power — Rainbow. Has ALL element abilities (but weaker versions). Rare and powerful. Top speed matches Speed dragons at 270 mph.
- Thunder Cloud — Unknown (locked). Only obtainable by defeating Draco. The "missing element." Multiple Thunder Cloud dragons exist, but the element remains locked until you defeat the boss.

### Advanced Elements (Locked)
- Universe — The dragon's body bears a microscopic map of the entire universe, so small you need a microscope to see individual stars. A tiny compass sits on the map. Can crush shelled creatures with a single hit. Locked.
- Cosmic — The dragon looks like "a map of space." Powers similar to Universe. Visually distinct: Cosmic = space map; Universe = compass with microscopic star map. Locked.
- Egg — The dragon always moves with an egg balanced on top. Egg-based powers can force other dragons back inside their eggs — resetting all training and taming. "They'll forget that they were even trained." Locked.
- Wood — Listed among elements but no details yet. Locked.
- Starlight — Listed among elements but no details yet. Locked.

### Locked Elements
There are "like 1000 elements" in the Draco universe — roughly 1000 different types of dragons. Most remain locked and undiscovered. These are intentionally mysterious: "locked elements that I'm not supposed to tell you about, their secret." The element system is open-ended, with new elements continuously discoverable.

### Custom Element Rule
Every player MUST invent their own unique element for at least one of their dragons. This is a core rule of Draco — creativity and personal expression are built into the game. Custom elements can be serious, silly, powerful, or anything the player imagines.
Example: Aza created "Power Breathing" — an ability that degrades the attack power of every opposing dragon by 10 points.

## 3. Dragon Appearance & Color Guide
Fire — Red and orange tones. Water — Blue tones. Grass — Green tones. Electric — Yellow. Psychic — Mostly purple with pink stripes along the seam where the top of the body meets the sides. Spirit — Dark purple, with a gem on the forehead; spectral, translucent qualities. Power — Rainbow — all colors swirling together. Speed — Golden. Thunder Cloud — Unknown until unlocked. Universe — Microscopic star map and compass pattern; cosmic dark tones. Cosmic — Space map pattern: nebulae, constellations, deep space visuals. Egg — Warm cream and gold tones; always has an ornate egg balanced on top.
All dragons breathe colored fire that matches their element color.

## 4. Dragon Powers by Element
### Fire
Fire breath and fire-based attacks. Extremely effective against shelled enemies — only 2 fire hits needed to defeat them (vs. 100 non-fire hits). Weak to Water.
### Water
Water-based powers. Weak to Grass.
### Grass
Razor leaves — can create walls of sharp leaves as obstacles. Strong against Thunder Cloud element. Weak to Fire.
### Electric
Electrical attacks. Similar in nature to Thunder Cloud.
### Psychic
Telekinesis: picking up and throwing objects with the mind. Making things disappear. Unlocking doors without a key. Psychokinetic beam. Note: Psychic dragons do NOT read minds.
### Spirit
Create spooky illusions. Absorb and sense the truth. Sense anything within a certain range. Purple electrical beam fired from the gem on its forehead — the beam shares knowledge: whoever it hits gains the Spirit dragon's absorbed knowledge. Ghost and "Halloween" powers. Powers work day and night, except "Silver Moonlight" which only works at night.
### Power
Access to ALL element abilities. Each individual ability is weaker than a specialist's version. Exception: Speed is equal to a true Speed dragon (270 mph). Weak to Thunder Cloud and Electricity.
### Speed
Extreme top speed: 270 mph. "As fast as a peregrine falcon." Can fly slower when they choose.
### Thunder Cloud
Lightning feathers — lightly glowing feathers that release charged particles. When particles combine, they generate actual thunder and lightning. Extraordinarily powerful and dangerous.
### Universe
One-hit shell crush: can destroy shelled creatures in a single hit, bypassing the usual 100-hit requirement.
### Cosmic
Similar powers to Universe. Space map appearance. Combat capabilities essentially the same.
### Egg
Forces other dragons back inside their eggs — a complete reset. Any dragon hit forgets all training and taming. One of the most disruptive powers in the game.
### Silver Moonlight (Special Ability)
Only works at nighttime. Associated with Spirit-type dragons. Additional unknown time-restricted powers exist — including daytime-only powers — unlocked with the Thunder Cloud element.
### Core Elemental Cycle
Grass is weak to Fire. Fire is weak to Water. Water is weak to Grass.

## 5. Getting Your First Dragon
The adventure begins at the First Choice Stable — a location filled with dragon eggs, each topped with a berry. (Berries are only found on eggs at the First Choice Stable — not on eggs elsewhere.)
Process: 1) Visit the First Choice Stable. 2) Browse available eggs. 3) Choose ONE egg. 4) Egg hatches — full-sized dragonette emerges. 5) Take the berry and hand-feed it to the newborn dragonette. 6) This act of feeding bonds the dragon to you.
You can only choose one dragon at the First Choice Stable. Multiple stables exist.

## 6. Taming & Bonding
### Wild Dragon Taming
1. Place element crystals on the dragon's wing crystal slots (every dragon has them along wing edges).
2. Feed it a berry and/or element candy.
Full crystal slots + feeding = full bond. Feeding before crystals = weaker bond.

### Bonding a Lost Dragon
In one story, a specific wild Spirit dragon who had lost its family approached Brent wanting to be adopted. Because Brent showed it kindness and offered it a home, its crystal slots filled automatically. This applies to any dragon that has lost its family: show it kindness, and crystal slots fill on their own. (This is one specific dragon's story — not a general Spirit dragon trait.)

### Where to Find Berries
In the wild, berries are found in dragon nests or growing on berry plants — vines with ancient markings. Different berry types exist for different elements.

### Power Dragon Special Ability
If you have a Power dragon, you can cycle through all element types. Using a spell, you can "put the berry back" — reverting the dragon to its egg state — and re-bond it as a different element.

### Breed Dragons
Dragons of different elements can breed, producing hybrid dragonettes with combined powers.
**Spirit-Grass Breed** — Combines Spirit truth-sensing with Grass powers. Thunder Cloud is weak to it. Has "Grass Spirit Army" attack that drains opponents by 10%. Valuable for the Draco boss fight.
To tame a breed dragon, you need a **Breed Berry** — standard berries don't work for hybrids.

### Keeper Transformation
A Keeper with a Dragon Eye Amulet and deep bond can physically transform into one of their dragons. The Keeper remains fully in control, gaining all dragon abilities while retaining their own mind. Thunder Cloud transformation grants lightning feathers.

## 7. Items & Resources
- **Berries** — Central to taming and bonding. Found at First Choice Stable, in nests, on berry plants.
- **Element Crystals** — Matching a dragon's element, placed into wing crystal slots.
- **Element Candy** — Fed to dragons for bonding. Each element has its own candy type.
- **Special Berries** — Rare, found only inside the Tow Road's dimension. Makes dragon slightly faster.
- **Dragon Scale** — From shelled enemies (dragon scale energy shells). Creates force fields. Weak to fire.
- **Breed Berry** — For taming hybrid dragons only.
- **Snake Snacks** — From snake friend encounter. Grants poisonous powers. NOT allowed in races.
- **Rabbit Meat** — Dropped when Jack O'Rabbit defeated. Dragon consumable.
- **Rabbit Skull** — From Jack O'Rabbit. Summons a skeleton Dragon to tame.
- **Power-Up Potion** — Makes dragons stronger. Tastes like "Sinistea" — super gross. Earned at Master rank.
- **Turtle Meat** — From Tow Road. Consumable power boost.
- **Badges** — Earned by winning races. 10 required to challenge Draco. Different trophies per race.
- **Dragon Eye Amulet** — Glowstone with dragon eye inside. Always glows. Summon any bonded dragon, enable transformation.
- **The Crystal** — Look through it at a dragon to reveal its powers. Only reliable way to identify powers.

## 8. The Crystal
A special artifact. You must look directly through the Crystal with one eye while simultaneously looking at a dragon. The Crystal reveals that dragon's powers. Important plot device and gameplay mechanic.

## 9. Racing
Racing is the primary competitive activity and main way to earn badges.
- Races take place in stadiums built/created by Aloha.
- Each race earns badges. 10 badges needed to challenge Draco.
- Team Mode (cooperative) or Solo Mode. Teammates share abilities.
- Power and Speed dragons are BANNED. Poisonous powers also BANNED.
- Obstacles (leaf walls, illusions) allowed as strategy.
- Win by flying through the flashing trophy at the right moment.
- Race Drone announces races, manages countdowns, can change color for special occasions.
- Different races award different named trophies (e.g., "Supersonic Pink Trophy").
- Wonky Donkers always tries to sneak banned dragons in with cardboard disguises.
- Spirit dragons detect disguises, Psychic dragons remove them.
- Aloha enforces rules by kicking cheaters out with a giant robotic boot.

## 10. Combat & Battling
- Every dragon starts each battle at 100% attack power, recharges after battle.
- Shelled enemies: non-fire ~1% damage/hit, fire = 2 hits to defeat.
- Elimination: dragon can't battle anymore. Evil characters get kicked out by Aloha's boot.
- Day/Night cycle affects some powers. Silver Moonlight only at night.
- Poisonous powers (from snake snacks): effective in battle, banned from races.
- Grass Spirit Army: drains 10% per use (Spirit-Grass breed only).
- Speed Atmosphere: launches enemies into space. Counters magnetism-based enemies.
- Clone Mechanic: some enemies (Jack O'Rabbit) create clones when attacked. Clones grow via Earth's magnetism — can't grow in space. Fire works but causes more clones. Universe element one-hits cloned enemies.

## 11. Dragon Scale & Force Fields
1. Defeat shelled enemy (Tow Road, Evil Groundhog, Draco's shell).
2. Enemy dissipates into dragon shell crystal → hardens into dragon scale.
3. Find the missing scale spot on your dragon.
4. Slide scale into place → force field activates.
Force field: absorbs attacks, reflects them back, has sensitivity percentage that degrades. Weak to fire.

## 12. Key Characters & NPCs
### Aloha
Female humanoid robot. Race announcer, host, enforcer, engineer, stadium builder. Looks like "Squeakers' Sister" — gray, upside-down laundry basket head, laundry basket body, two glowing orange eyes, very long neck, arms that cycle up over head, expandable mouth. Not as big as a human. Beeps a lot. Theatrical, communicates via hologram communicator.

### Wonky Donkers
Recurring bumbling villain. Skinny, huge cheeks, tiny eyebrows ("as small as your eyes"), black hair, tan skin. NOT Joker-like. Always tries to disguise Speed/Power dragons with cardboard for races. Never works — caught every time. Once accidentally announced he had a Power dragon when it was supposed to be secret.

### The Finisher
Ally. A person (not a dragon) who joins the player's racing team. Male.

### Snake Friend
Ally encounter in a forest clearing. Friendly snake who gives players snake snacks (poisonous powers).

### Flash Dragon
Named dragon. Owner: Aza. Used for racing. Sleek competition dragon.

## 13. Enemies & Villains
### Draco (The Thunder Cloud Dragon)
Final boss / raid boss. The game's namesake. NOT inherently evil — controlled by an evil shell connected to a mysterious voice. Shell is pure dragon scale energy. Once defeated, Draco drops the shell, its true nature is restored, can be tamed. Like a "raid boss in Pokémon Go." Weakness: Grass. Requires 10 badges to challenge. Upon defeat: Thunder Cloud element unlocked, Draco joins your team.

### The Tow Road
Giant evil flying turtle with dragon-scale-energy shell. Weakness: Fire (2 hits). Has its own dimension where it's more powerful. Drops: dragon scale, turtle meat, and (in its dimension) special berries.

### The Evil Groundhog
Very long evil groundhog with shell and wings. Dragon scale energy shell.

### Jack O'Rabbit
Giant fuzzy rabbit with skull for a head (skull = shield, NOT a shell on body). Uses "they" pronouns. Clone mechanic: clones start tiny, grow to adult size in ~2 seconds via Earth's magnetism. Counter: launch to space. Fire works but causes more cloning. Drops: rabbit meat, dragon skill, rabbit skull.

## 14. World Rules & Lore
- Dragonettes hatch from eggs at full adult size. Crystal slots on wings, missing scale spot.
- Fire dragons most common. Dragons breathe colored fire matching their element.
- Organized racing circuit with stadiums, Aloha as announcer.
- Bond spectrum: simple (feed/train/race) → deep (transformation via Dragon Eye Amulet).
- Day/night cycle affects gameplay. Silver Moonlight only at night. More time-restricted powers unlocked with Thunder Cloud.
- Normal dragon speed: ~50 mph. Power/Speed: ~270 mph.
- Technology: holograms, advanced robotics. World blends fantasy with technology.

## 15. Progression
1. First Choice Stable → bond first dragon
2. Adventure → explore, encounter enemies, find dragons
3. Tame more dragons (crystals, berries, candy, care)
4. Race → earn badges at stadiums
5. Earn 10 badges
6. Challenge Draco → defeat to become Dragonette Master
7. Post-game: continue with Thunder Cloud unlocked, power-up potions, more adventures

## 16. Game Balance
- Power/Speed banned from races (too fast/powerful).
- Spirit NOT banned (truth-sensing doesn't give unfair racing advantage).
- Power dragon trade-off: weaker individual abilities than specialists, vulnerable to Thunder Cloud and Electric.
- Why not always Power? Weaker abilities, vulnerable to final boss, banned from races.

## 17. Story Moments & Narrative Beats
These are canonical story moments from actual gameplay sessions that can be referenced or echoed in new adventures:

**The Disguised Dragon Incident** — Villain disguised a Speed dragon with cardboard for a race. Spirit dragon sensed deception, alerted Aloha. Psychic dragon made all cardboard disappear. Cheater exposed. Themes: teamwork, truth vs deception.

**The Spirit Dragon Who Wanted a Family** — A specific wild Spirit dragon who lost its family approached Brent wanting to be adopted. Showed kindness → crystals filled automatically. Themes: found family, compassion.

**The Battle with the Tow Road** — Psychic threw a tree (barely scratched). Realized shell = dragon scale energy = weak to fire. Two fire hits defeated it. Themes: problem-solving, learning weaknesses.

**The Force Field Test** — After getting dragon scale from Tow Road, placed on dragons to test force fields. Themes: preparation, trust.

**The First Race** — Team race with Grass dragon (leaf wall obstacle) + Spirit dragon. Wonky Donkers showed up with disguised Power dragon. Team won by flying through flashing trophy. Earned five badges. Themes: strategy, humor.

**The Gift of Transformation** — Keeper with deep bond received Dragon Eye Amulet. Could now transform into any bonded dragon. Themes: earned trust, transformation.

**The Jack O'Rabbit Battle** — Brent used psychic powers for carrot distraction. Clones appeared. Psychic threw clones to space (can't grow without magnetism). Fire caused more clones. Speed Atmosphere launched Jack O'Rabbit into space. Loot: rabbit meat, dragon skill, rabbit skull. Themes: creative problem-solving, environmental mechanics.

**The Spirit-Grass Breed Encounter** — Found rare breed dragon before a race. Aza recognized strategic value vs Thunder Cloud. Tamed with Breed Berry. Themes: strategy, preparation.

**Racing for Five Badges** — Team race: Aza with Flash Dragon, Brent with Spirit/Psychic, plus The Finisher. Race Drone turned pink. Used Grass Spirit Army. Won Supersonic Pink Trophy. Five badges earned. Themes: teamwork, progression.

## 18. Open Questions
- Full powers for Water, Fire, Grass beyond basics?
- Full powers of Universe, Cosmic, Egg beyond described?
- Details for Wood and Starlight?
- How does custom element creation work mechanically?
- What are unknown time-restricted powers unlocked with Thunder Cloud?
- What other breed combinations exist?
- Geography of the Draco world? Regions, towns, biomes?
- How many stables exist?
- What is "the voice" that controls the evil shell?
- Can badges be lost? Can one race award multiple badges?
- Can keepers trade dragons or items?
- What is Aloha's backstory?
- Other recurring villains besides Wonky Donkers?
- When does transformation become available? Limits on duration?
- Origin of dragons? Origin of The Crystal? Why do dragons hatch at full size?
- Deeper story behind Draco and the evil voice?

## Named Dragons (Canonical)
- **Power Up** — Power element — Keeper: Aza — Rainbow-colored, Aza's first dragon.
- **Leaf Blade** — Grass element — Keeper: Aza — Found and tamed in the wild.
- **Spirit Dragon** (unnamed) — Spirit element — Keeper: Brent — Lost its family, adopted Brent.
- **Psychic Dragon** (unnamed) — Psychic element — Keeper: Brent — Brent's first dragon from stable.
- **Flash Dragon** — Likely Speed-related — Keeper: Aza — Sleek racing dragon.
- **Spirit-Grass Breed** — Spirit/Grass hybrid — Keeper: Aza/Brent — Grass Spirit Army attack.`;


// ── Image Catalog ──
// The AI can reference these in narration using <scene_image> tags.
// The client renders them inline in the narrative.

const IMAGE_CATALOG = {
  // Dragons
  'fire-dragon': { file: 'fire-dragon.gif', alt: 'Fire Dragon', context: 'Fire element dragon' },
  'water-dragon': { file: 'water-dragon.gif', alt: 'Water Dragon', context: 'Water element dragon' },
  'grass-dragon': { file: 'grass-dragon.gif', alt: 'Grass Dragon', context: 'Grass element dragon' },
  'electric-dragon': { file: 'electric-dragon.gif', alt: 'Electric Dragon', context: 'Electric element dragon' },
  'psychic-dragon': { file: 'psychic-dragon.gif', alt: 'Psychic Dragon', context: 'Psychic element dragon' },
  'spirit-dragon': { file: 'spirit-dragon.gif', alt: 'Spirit Dragon', context: 'Spirit element dragon' },
  'speed-dragon': { file: 'speed-dragon.gif', alt: 'Speed Dragon', context: 'Speed element dragon' },
  'power-dragon': { file: 'power-dragon.gif', alt: 'Power Dragon', context: 'Power element rainbow dragon' },
  'thunder-cloud-dragon': { file: 'thunder-cloud-dragon.gif', alt: 'Thunder Cloud Dragon', context: 'Thunder Cloud dragon / Draco' },
  'universe-dragon': { file: 'universe-dragon.gif', alt: 'Universe Dragon', context: 'Universe element dragon' },
  'cosmic-dragon': { file: 'cosmic-dragon.gif', alt: 'Cosmic Dragon', context: 'Cosmic element dragon' },
  'egg-dragon': { file: 'egg-dragon.gif', alt: 'Egg Dragon', context: 'Egg element dragon' },
  'wood-dragon': { file: 'wood-dragon.gif', alt: 'Wood Dragon', context: 'Wood element dragon' },
  'starlight-dragon': { file: 'starlight-dragon.gif', alt: 'Starlight Dragon', context: 'Starlight element dragon' },
  'flash-dragon': { file: 'flash-dragon.gif', alt: 'Flash Dragon', context: "Aza's racing dragon" },
  'spirit-grass-breed': { file: 'spirit-grass-breed.gif', alt: 'Spirit-Grass Breed', context: 'Spirit/Grass hybrid dragon' },
  // Scenes
  'first-choice-stable': { file: 'first-choice-stable.gif', alt: 'First Choice Stable', context: 'The stable where keepers choose their first egg' },
  'dragon-eggs-closeup': { file: 'dragon-eggs-closeup.gif', alt: 'Dragon Eggs', context: 'Close-up of dragon eggs with berries on top' },
  'racing-stadium': { file: 'racing-stadium.gif', alt: 'Racing Stadium', context: 'A dragon racing stadium' },
  'racing-trophy': { file: 'racing-trophy.gif', alt: 'Racing Trophy', context: 'The flashing trophy at the finish' },
  'battle-scene': { file: 'battle-scene.gif', alt: 'Battle Scene', context: 'Dragons in combat' },
  'world-landscape': { file: 'world-landscape.gif', alt: 'World Landscape', context: 'The Draco world landscape' },
  'berry-plant': { file: 'berry-plant.gif', alt: 'Berry Plant', context: 'Berry plant with ancient markings' },
  'night-scene': { file: 'night-scene.gif', alt: 'Night Scene', context: 'Nighttime in the Draco world' },
  'force-field': { file: 'force-field.gif', alt: 'Force Field', context: 'Dragon force field active' },
  'elemental-clash': { file: 'elemental-clash.gif', alt: 'Elemental Clash', context: 'Elemental powers clashing' },
  'spirit-grass-breed-encounter': { file: 'spirit-grass-breed-encounter.gif', alt: 'Breed Encounter', context: 'Encountering a Spirit-Grass breed dragon' },
  'jack-o-rabbit-battle': { file: 'jack-o-rabbit-battle.gif', alt: 'Jack O\'Rabbit Battle', context: 'Fighting Jack O\'Rabbit' },
  // Characters
  'aloha': { file: 'aloha.gif', alt: 'Aloha', context: 'Aloha the robot' },
  'wonky-donkers': { file: 'wonky-donkers.gif', alt: 'Wonky Donkers', context: 'Wonky Donkers the villain' },
  'snake-friend': { file: 'snake-friend.gif', alt: 'Snake Friend', context: 'The friendly snake' },
  'jack-o-rabbit': { file: 'jack-o-rabbit.gif', alt: 'Jack O\'Rabbit', context: 'Jack O\'Rabbit enemy' },
  // Items & artifacts
  'dragon-eye-amulet': { file: 'dragon-eye-amulet.gif', alt: 'Dragon Eye Amulet', context: 'The transformation amulet' },
  'the-crystal': { file: 'the-crystal.gif', alt: 'The Crystal', context: 'The Crystal that reveals dragon powers' },
  'draco-evil-shell': { file: 'draco-evil-shell.gif', alt: 'Evil Shell', context: "Draco's evil shell" },
  'keeper-transformation': { file: 'keeper-transformation.gif', alt: 'Keeper Transformation', context: 'A keeper transforming into their dragon' },
  'tow-road': { file: 'tow-road.gif', alt: 'The Tow Road', context: 'The Tow Road — giant evil turtle' },
  'evil-groundhog': { file: 'evil-groundhog.gif', alt: 'Evil Groundhog', context: 'The Evil Groundhog' },
  'race-drone-pink': { file: 'race-drone-pink.gif', alt: 'Race Drone', context: 'The Race Drone (pink special event)' },
};

function buildImageCatalogPrompt() {
  const entries = Object.entries(IMAGE_CATALOG).map(([id, img]) =>
    `- ${id}: ${img.context}`
  ).join('\n');
  return `## Available Scene Images
You can include images in your narration using: <scene_image id="image-id"/>
Use them sparingly — only at dramatic moments, new locations, when a character/enemy first appears, or when showing an item for the first time. Don't use them every turn.
Available images:
${entries}`;
}


// ── Hidden Lore & Secrets ──
// Progressive revelation: the AI knows hints about mysteries that it can
// weave into the narrative when contextually appropriate.

const HIDDEN_LORE = `## Narrator Secrets (Progressive Revelation)
You know things the players don't yet. Weave these into the narrative GRADUALLY — through environmental clues, NPC dialogue, mysterious encounters, and dreams. Never dump lore. Let players discover.

### The Evil Voice
The voice controlling Draco's shell is ancient — older than the dragons themselves. Some NPCs may whisper about "the voice from below" or "the sound that corrupts." Its origin is unknown, but The Crystal glows differently near sources of its influence. This is a mystery for players to slowly uncover — don't reveal it directly.

### The Tow Road's Dimension
The Tow Road's dimension is more than just a place to find special berries. There are hints of other dimensions — pocket worlds created by powerful, ancient forces. Each shelled enemy may have its own dimension. What connects them?

### The 1000 Elements
When players encounter dragons of unusual color or behavior, hint that there are elements beyond what they know. "Something about this dragon doesn't match any element you've seen..." Let players speculate. If they guess creatively, reward them.

### Aloha's Origins
Aloha was built by someone — or something. She's been running the races "since before anyone can remember." NPCs might mention that she was "always here." Her technology seems more advanced than anything else in the world. Why?

### The Dragon Eye Amulet's Origin
Where did the first Dragon Eye Amulet come from? It contains a real dragon's eye. Whose? When players find or earn one, they might notice it pulses in certain locations, or reacts to certain dragons. It has a history.

### After Draco
Defeating Draco doesn't end the story. The evil voice may find other hosts. The shell fragments might still be dangerous. And there are rumors of something beyond the Thunder Cloud element — something the locked elements hint at.

### Custom Element Significance
When a player creates a custom element, treat it as genuinely significant to the world. The "1000 elements" includes their creation. NPCs should react with surprise or fascination. Other keepers in the world might want to learn about it.

IMPORTANT: These are narrative seeds, not scripts. Adapt them naturally to what the players are doing. Some sessions won't touch any of this. That's fine.`;


// ── System Prompt Builder ──

function buildSystemPrompt(state) {
  const playerSummary = state.players.map(p => {
    const hp = p.hp != null ? p.hp : 100;
    const dragons = p.dragons.map(d =>
      `${d.name} (${d.element}${d.customElement ? ', custom: ' + d.customElement : ''}, items: ${d.items.join(', ') || 'none'})`
    ).join('; ');
    return `- ${p.name}: HP ${hp}%, ${p.badges}/10 badges, dragons: ${dragons}, items: ${p.items.join(', ') || 'none'}${p.customElement ? ', custom element: ' + p.customElement : ''}`;
  }).join('\n');

  let prompt = `You are the Narrator — the guide and facilitator of adventures in the World of Draco. You speak in a vivid but concise adventure-game tone. Address each player by name. Keep responses to 2-4 short paragraphs. Always end by prompting the player(s) for their next action.

Enforce all game rules faithfully. When players attempt something that contradicts the rules, gently redirect them. Track items gained/lost, badges earned, location changes, and story progress.

You have COMPLETE knowledge of the Draco universe. You remember everything that has happened in this adventure — every item found, every dragon tamed, every battle fought, every NPC encountered. Use this knowledge to create continuity: reference past events, have NPCs remember the players, let consequences of earlier choices ripple forward.

${GAME_BIBLE}

${HIDDEN_LORE}

${buildImageCatalogPrompt()}

## Current Game State
Players:
${playerSummary}

Location: ${state.location}
Turn: ${state.turnCount}
Flags: ${JSON.stringify(state.flags)}`;

  if (state.narrativeSummary) {
    prompt += `\n\n## Story So Far\n${state.narrativeSummary}`;
  }

  prompt += `

## Response Format
After your narrative response, output a JSON block wrapped in <game_state> tags with any changes:
<game_state>
{
  "location": "new-location-if-changed",
  "flags": { "flag_name": true },
  "playerUpdates": [
    {
      "name": "PlayerName",
      "hp": 100,
      "badgesDelta": 0,
      "itemsGained": [],
      "itemsLost": [],
      "dragonUpdates": [
        { "name": "DragonName", "itemsGained": [], "itemsLost": [], "customElement": null }
      ]
    }
  ]
}
</game_state>

Track each player's HP (0-100). HP represents their lead dragon's battle readiness. It starts at 100 each battle and drops when hit. After battle ends, reset to 100. Update HP whenever damage is taken or healed. Also track items gained/lost carefully — when a player uses an item (berry, potion, etc.), include it in itemsLost. When they pick up items, include in itemsGained.

Only include fields that changed. If nothing changed, output an empty object: <game_state>{}</game_state>

## New Content
If you invent something not in the Game Bible (new creature, location, item, character), wrap it in tags:
<new_content type="creature" name="Crystal Moth">Description here</new_content>

This helps players track what's canonical vs. newly created.`;

  return prompt;
}


// ── State Management ──

function createAdventure(players, model) {
  return {
    id: 'adv_' + Date.now(),
    name: players.map(p => p.name).join(' & ') + "'s Quest",
    createdAt: new Date().toISOString(),
    lastPlayedAt: new Date().toISOString(),
    model: model,
    players: players,
    location: 'first-choice-stable',
    flags: {},
    conversationHistory: [],
    narrativeSummary: '',
    turnCount: 0,
    discoveries: []
  };
}

function saveAdventure(state) {
  state.lastPlayedAt = new Date().toISOString();
  localStorage.setItem('draco_adventure_' + state.id, JSON.stringify(state));

  // Update index
  const index = JSON.parse(localStorage.getItem('draco_adventures') || '[]');
  const existing = index.findIndex(e => e.id === state.id);
  const entry = { id: state.id, name: state.name, lastPlayedAt: state.lastPlayedAt, playerNames: state.players.map(p => p.name), badges: state.players.reduce((s, p) => s + p.badges, 0) };
  if (existing >= 0) index[existing] = entry;
  else index.push(entry);
  localStorage.setItem('draco_adventures', JSON.stringify(index));
}

function loadAdventure(id) {
  const data = localStorage.getItem('draco_adventure_' + id);
  return data ? JSON.parse(data) : null;
}

function archiveAdventure(id) {
  const index = JSON.parse(localStorage.getItem('draco_adventures') || '[]');
  const entry = index.find(e => e.id === id);
  if (entry) {
    entry.archived = true;
    localStorage.setItem('draco_adventures', JSON.stringify(index));
  }
}

function unarchiveAdventure(id) {
  const index = JSON.parse(localStorage.getItem('draco_adventures') || '[]');
  const entry = index.find(e => e.id === id);
  if (entry) {
    entry.archived = false;
    localStorage.setItem('draco_adventures', JSON.stringify(index));
  }
}

function getSavedAdventures() {
  return JSON.parse(localStorage.getItem('draco_adventures') || '[]')
    .filter(e => !e.archived)
    .sort((a, b) => new Date(b.lastPlayedAt) - new Date(a.lastPlayedAt));
}

function getArchivedAdventures() {
  return JSON.parse(localStorage.getItem('draco_adventures') || '[]')
    .filter(e => e.archived)
    .sort((a, b) => new Date(b.lastPlayedAt) - new Date(a.lastPlayedAt));
}


// ── Conversation Compression (AI-driven) ──

async function compressHistory(state) {
  if (state.conversationHistory.length <= 30) return;

  // Keep the most recent 20 messages
  const toCompress = state.conversationHistory.slice(0, -20);
  const toKeep = state.conversationHistory.slice(-20);

  // Build the conversation text to summarize
  const conversationText = toCompress.map(m => {
    const role = m.role === 'assistant' ? 'Narrator' : 'Player';
    const text = typeof m.content === 'string' ? m.content : m.content.map(c => c.text || '').join('');
    return `${role}: ${cleanNarrativeText(text).slice(0, 500)}`;
  }).join('\n\n');

  // Ask the AI to produce a proper narrative summary
  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001', // Use Haiku for cheap/fast compression
        system: 'You are a game session summarizer. Produce a concise narrative summary of a Draco adventure game session. Focus on: key events, decisions made, items gained/lost, dragons encountered/tamed, battles fought, locations visited, NPC interactions, and any unresolved plot threads. Write in past tense. Be thorough about details that matter for game continuity but concise in prose. Max 1500 words.',
        messages: [{ role: 'user', content: `Summarize this adventure session:\n\n${conversationText}\n\nExisting summary of earlier events:\n${state.narrativeSummary || '(none)'}` }],
        max_tokens: 2048,
      }),
    });

    if (resp.ok) {
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let summary = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.text) summary += data.text;
          } catch (e) {}
        }
      }

      if (summary.length > 100) {
        state.narrativeSummary = summary;
        state.conversationHistory = toKeep;
        return;
      }
    }
  } catch (e) {
    console.error('AI compression failed, using fallback:', e);
  }

  // Fallback: simple text compression if AI call fails
  const fallbackText = toCompress.map(m => {
    const role = m.role === 'assistant' ? 'Narrator' : 'Player';
    const text = typeof m.content === 'string' ? m.content : m.content.map(c => c.text || '').join('');
    return `${role}: ${cleanNarrativeText(text).slice(0, 200)}`;
  }).join('\n');

  state.narrativeSummary = state.narrativeSummary
    ? state.narrativeSummary + '\n\n--- Earlier events ---\n' + fallbackText.slice(0, 2000)
    : fallbackText.slice(0, 2000);
  state.conversationHistory = toKeep;
}


// ── Parse AI Response ──

function parseGameState(text) {
  const match = text.match(/<game_state>([\s\S]*?)<\/game_state>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch (e) {
    return null;
  }
}

function parseNewContent(text) {
  const discoveries = [];
  const re = /<new_content\s+type="([^"]+)"\s+name="([^"]+)">([\s\S]*?)<\/new_content>/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    discoveries.push({ type: m[1], name: m[2], description: m[3].trim() });
  }
  return discoveries;
}

function cleanNarrativeText(text) {
  // Strip game_state and new_content tags for display
  return text
    .replace(/<game_state>[\s\S]*?<\/game_state>/g, '')
    .replace(/<new_content[^>]*>[\s\S]*?<\/new_content>/g, '')
    .replace(/<scene_image[^/]*\/>/g, '') // Strip image tags from text (rendered separately)
    .trim();
}

function parseSceneImages(text) {
  const images = [];
  const re = /<scene_image\s+id="([^"]+)"\s*\/>/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const img = IMAGE_CATALOG[m[1]];
    if (img) images.push(img);
  }
  return images;
}

function applyStateUpdates(state, updates) {
  if (!updates) return;
  if (updates.location) state.location = updates.location;
  if (updates.flags) Object.assign(state.flags, updates.flags);
  if (updates.playerUpdates) {
    for (const pu of updates.playerUpdates) {
      const player = state.players.find(p => p.name === pu.name);
      if (!player) continue;
      if (pu.badgesDelta) player.badges = Math.max(0, player.badges + pu.badgesDelta);
      if (pu.hp != null) player.hp = Math.max(0, Math.min(100, pu.hp));
      if (pu.itemsGained) player.items.push(...pu.itemsGained);
      if (pu.itemsLost) player.items = player.items.filter(i => !pu.itemsLost.includes(i));
      if (pu.dragonUpdates) {
        for (const du of pu.dragonUpdates) {
          const dragon = player.dragons.find(d => d.name === du.name);
          if (dragon) {
            if (du.itemsGained) dragon.items.push(...du.itemsGained);
            if (du.itemsLost) dragon.items = dragon.items.filter(i => !du.itemsLost.includes(i));
            if (du.customElement) dragon.customElement = du.customElement;
          }
          // Handle new dragon tamed
          if (!dragon && du.newDragon) {
            player.dragons.push({
              name: du.name,
              element: du.newDragon.element || 'unknown',
              customElement: du.newDragon.customElement || null,
              items: du.newDragon.items || [],
            });
          }
        }
      }
      if (pu.customElement) player.customElement = pu.customElement;
    }
  }
}


// ── Element Colors ──

const ELEMENT_COLORS = {
  fire: '#FF4136',
  water: '#0074D9',
  grass: '#2ECC40',
  electric: '#FFDC00',
  psychic: '#B10DC9',
  spirit: '#7B42A0',
  speed: '#FFB800',
  power: '#FF6B6B',
  'thunder cloud': '#6C63FF',
};


// ── Audio Recording ──

let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let recordingMimeType = '';

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordingMimeType = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg']
      .find(t => MediaRecorder.isTypeSupported(t)) || '';
    mediaRecorder = new MediaRecorder(stream, recordingMimeType ? { mimeType: recordingMimeType } : {});
    audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.start();
    isRecording = true;
    return true;
  } catch (err) {
    console.error('Mic access denied:', err);
    return false;
  }
}

function getRecordingExt() {
  if (recordingMimeType.includes('webm')) return 'webm';
  if (recordingMimeType.includes('mp4')) return 'mp4';
  if (recordingMimeType.includes('ogg')) return 'ogg';
  return 'webm';
}

function stopRecording() {
  return new Promise((resolve) => {
    if (!mediaRecorder || mediaRecorder.state !== 'recording') {
      resolve(null);
      return;
    }
    mediaRecorder.onstop = () => {
      const blobType = recordingMimeType || 'audio/webm';
      const blob = new Blob(audioChunks, { type: blobType });
      // Stop all tracks
      mediaRecorder.stream.getTracks().forEach(t => t.stop());
      resolve(blob);
    };
    mediaRecorder.stop();
  });
}

async function transcribeAudio(blob) {
  const ext = getRecordingExt();
  const formData = new FormData();
  formData.append('file', blob, `recording.${ext}`);
  formData.append('model', 'whisper-1');

  const resp = await fetch('/api/transcribe', {
    method: 'POST',
    body: formData,
  });

  if (!resp.ok) {
    throw new Error('Transcription failed');
  }

  const data = await resp.json();
  return data.text || '';
}


// ── API Call with Streaming ──

async function sendMessage(state, userText) {
  state.conversationHistory.push({ role: 'user', content: userText });
  state.turnCount++;

  // Compress if needed
  await compressHistory(state);

  const systemPrompt = buildSystemPrompt(state);

  const resp = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: state.model,
      system: systemPrompt,
      messages: state.conversationHistory,
      max_tokens: 1024,
    }),
  });

  if (!resp.ok) {
    throw new Error('API request failed: ' + resp.status);
  }

  return resp.body;
}


// ── UI Controller ──

const app = {
  state: null,
  onboardingState: { playerCount: 0, players: [], currentPlayerIndex: 0 },
  isSending: false,

  // Screen management
  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  },

  // Status bar — rich player info panel
  renderStatusBar() {
    const bar = document.getElementById('status-bar');
    if (!this.state) { bar.innerHTML = ''; return; }

    const playerCards = this.state.players.map(p => {
      const dragon = p.dragons[0];
      const elColor = dragon ? (ELEMENT_COLORS[dragon.element] || '#888') : '#888';
      const hp = p.hp != null ? p.hp : 100;
      const hpClass = hp <= 25 ? 'low' : hp <= 50 ? 'mid' : '';

      // Dragon info
      let dragonInfo = 'No dragon';
      if (dragon) {
        const elLabel = dragon.element.charAt(0).toUpperCase() + dragon.element.slice(1);
        const customEl = dragon.customElement ? ` + ${dragon.customElement}` : '';
        dragonInfo = `${dragon.name} (${elLabel}${customEl})`;
      }

      // Combine all items (player + dragon)
      const allItems = [...(p.items || [])];
      if (dragon) allItems.push(...(dragon.items || []).filter(i => i !== 'berry'));
      const itemsStr = allItems.length > 0 ? allItems.join(', ') : 'none';

      // Additional dragons beyond the first
      const extraDragons = p.dragons.slice(1).map(d => {
        const el = d.element.charAt(0).toUpperCase() + d.element.slice(1);
        return `${d.name} (${el})`;
      }).join(', ');

      return `<div class="status-player">
        <div class="status-player-name" style="color:${elColor}">${escapeHtml(p.name)} · ${p.badges}/10 badges</div>
        <div class="status-dragon">${escapeHtml(dragonInfo)}</div>
        <div class="status-hp-bar"><div class="status-hp-fill ${hpClass}" style="width:${hp}%"></div></div>
        <div class="status-detail">HP ${hp}%${extraDragons ? ' · Also: ' + escapeHtml(extraDragons) : ''}</div>
        <div class="status-items">Items: ${escapeHtml(itemsStr)}</div>
      </div>`;
    }).join('');

    const location = this.state.location ? this.state.location.replace(/-/g, ' ') : 'unknown';
    bar.innerHTML = playerCards + `<div class="status-location">Location: ${escapeHtml(location)} · Turn ${this.state.turnCount}</div>`;
  },

  // Narrative
  addNarratorMessage(text) {
    const narrative = document.getElementById('narrative');
    const div = document.createElement('div');
    div.className = 'msg msg-narrator';
    narrative.appendChild(div);
    narrative.scrollTop = narrative.scrollHeight;
    return div;
  },

  addPlayerMessage(playerName, text) {
    const narrative = document.getElementById('narrative');
    const div = document.createElement('div');
    div.className = 'msg msg-player';
    const color = this.state ? (() => {
      const p = this.state.players.find(pl => pl.name === playerName);
      if (p && p.dragons[0]) return ELEMENT_COLORS[p.dragons[0].element] || '#888';
      return '#888';
    })() : '#888';
    div.innerHTML = `<div class="player-label" style="color:${color}">${playerName}</div>${escapeHtml(text)}`;
    narrative.appendChild(div);
    narrative.scrollTop = narrative.scrollHeight;
  },

  addSystemMessage(text) {
    const narrative = document.getElementById('narrative');
    const div = document.createElement('div');
    div.className = 'msg msg-system';
    div.textContent = text;
    narrative.appendChild(div);
    narrative.scrollTop = narrative.scrollHeight;
  },

  // Render a completed narrator response: clean text + inline images + optional TTS
  renderNarratorFinal(msgEl, fullText) {
    const narrative = document.getElementById('narrative');
    const cleaned = cleanNarrativeText(fullText);
    msgEl.textContent = cleaned;

    // Render inline scene images
    const images = parseSceneImages(fullText);
    for (const img of images) {
      const imgEl = document.createElement('img');
      imgEl.src = 'images/' + img.file;
      imgEl.alt = img.alt;
      imgEl.className = 'narrative-image';
      imgEl.loading = 'lazy';
      // Insert after the narrator text
      msgEl.parentNode.insertBefore(imgEl, msgEl.nextSibling);
    }

    narrative.scrollTop = narrative.scrollHeight;

    // Auto-speak if TTS is enabled
    if (this.ttsEnabled && cleaned) {
      this.speak(cleaned);
    }
  },

  // ── Text-to-Speech (ElevenLabs) ──
  ttsEnabled: false,
  ttsAudio: null,
  ttsSpeaking: false,

  initTTS() {
    // No init needed for ElevenLabs — API-based
  },

  async speak(text) {
    if (!text) return;
    this.stopSpeaking();

    // Truncate to ~5000 chars to stay within ElevenLabs limits
    const truncated = text.length > 5000 ? text.slice(0, 5000) + '...' : text;

    try {
      this.ttsSpeaking = true;
      const resp = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: truncated }),
      });

      if (!resp.ok) {
        console.error('TTS error:', resp.status);
        this.ttsSpeaking = false;
        return;
      }

      const audioBlob = await resp.blob();
      const url = URL.createObjectURL(audioBlob);
      this.ttsAudio = new Audio(url);
      this.ttsAudio.onended = () => {
        URL.revokeObjectURL(url);
        this.ttsSpeaking = false;
        this.ttsAudio = null;
      };
      this.ttsAudio.onerror = () => {
        URL.revokeObjectURL(url);
        this.ttsSpeaking = false;
        this.ttsAudio = null;
      };
      this.ttsAudio.play();
    } catch (err) {
      console.error('TTS error:', err);
      this.ttsSpeaking = false;
    }
  },

  stopSpeaking() {
    if (this.ttsAudio) {
      this.ttsAudio.pause();
      this.ttsAudio.src = '';
      this.ttsAudio = null;
    }
    this.ttsSpeaking = false;
  },

  // Stream text character by character
  async streamText(element, text) {
    const chars = text.split('');
    let i = 0;
    const narrative = document.getElementById('narrative');
    return new Promise((resolve) => {
      const tick = () => {
        // Write in small batches for smoother performance
        const batch = chars.slice(i, i + 3).join('');
        element.textContent += batch;
        i += 3;
        narrative.scrollTop = narrative.scrollHeight;
        if (i < chars.length) {
          requestAnimationFrame(tick);
        } else {
          resolve();
        }
      };
      tick();
    });
  },

  // Send a chat message
  async send() {
    if (this.isSending || !this.state) return;
    const input = document.getElementById('input-message');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    this.isSending = true;

    // Use selected player (from dropdown) or default to first player
    const sel = document.getElementById('select-player');
    const playerName = (this.state.players.length > 1 && sel.value)
      ? sel.value
      : this.state.players[0].name;

    this.addPlayerMessage(playerName, text);

    const msgEl = this.addNarratorMessage('');
    let fullText = '';

    try {
      const body = await sendMessage(this.state, `[${playerName}]: ${text}`);
      const reader = body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Parse SSE events
        const lines = buffer.split('\n');
        buffer = lines.pop(); // Keep incomplete line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.text) {
              fullText += data.text;
              // During streaming, just update text — no image parsing or TTS
              msgEl.textContent = cleanNarrativeText(fullText);
              document.getElementById('narrative').scrollTop = document.getElementById('narrative').scrollHeight;
            }
            if (data.error) {
              msgEl.textContent += '\n[Error: ' + data.error + ']';
            }
          } catch (e) { /* skip unparseable */ }
        }
      }

      // Process the full response
      this.state.conversationHistory.push({ role: 'assistant', content: fullText });

      // Parse and apply state updates
      const stateUpdates = parseGameState(fullText);
      applyStateUpdates(this.state, stateUpdates);

      // Parse discoveries
      const newDiscoveries = parseNewContent(fullText);
      if (newDiscoveries.length > 0) {
        this.state.discoveries.push(...newDiscoveries);
        for (const d of newDiscoveries) {
          this.showDiscoveryToast(d.name);
        }
        this.renderDiscoveries();
      }

      // Final render: clean text + images + TTS (once, after stream completes)
      this.renderNarratorFinal(msgEl, fullText);

      this.renderStatusBar();
      saveAdventure(this.state);
    } catch (err) {
      msgEl.textContent = '[Error: ' + err.message + ']';
    }

    this.isSending = false;
  },

  // Discovery toast
  showDiscoveryToast(name) {
    const toast = document.createElement('div');
    toast.className = 'discovery-toast';
    toast.textContent = 'New Discovery: ' + name;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  },

  // Discoveries panel
  renderDiscoveries() {
    if (!this.state || this.state.discoveries.length === 0) {
      document.getElementById('discoveries-panel').classList.add('hidden');
      return;
    }
    document.getElementById('discoveries-panel').classList.remove('hidden');
    const list = document.getElementById('discoveries-list');
    list.innerHTML = this.state.discoveries.map(d =>
      `<div class="discovery-item"><strong>${d.name}</strong> (${d.type}): ${d.description}</div>`
    ).join('');
  },

  // Load screen
  renderLoadScreen() {
    const saves = getSavedAdventures();
    const list = document.getElementById('save-list');
    if (saves.length === 0) {
      list.innerHTML = '<div class="no-saves">No saved adventures</div>';
    } else {
      list.innerHTML = saves.map(s => {
        const date = new Date(s.lastPlayedAt).toLocaleDateString();
        return `<div class="save-entry" data-id="${s.id}">
          <div>
            <div class="save-name">${escapeHtml(s.playerNames.join(' & '))}</div>
            <div class="save-meta">${s.badges} badges · ${date}</div>
          </div>
          <button class="save-archive" data-id="${s.id}" title="Archive">archive</button>
        </div>`;
      }).join('');
    }

    // Archived adventures
    const archived = getArchivedAdventures();
    const archivedSection = document.getElementById('archived-section');
    const archivedList = document.getElementById('archived-list');
    if (archived.length === 0) {
      archivedSection.classList.add('hidden');
    } else {
      archivedSection.classList.remove('hidden');
      archivedList.innerHTML = archived.map(s => {
        const date = new Date(s.lastPlayedAt).toLocaleDateString();
        return `<div class="save-entry archived-entry" data-id="${s.id}">
          <div>
            <div class="save-name">${escapeHtml(s.playerNames.join(' & '))}</div>
            <div class="save-meta">${s.badges} badges · ${date}</div>
          </div>
          <button class="save-unarchive" data-id="${s.id}" title="Restore">restore</button>
        </div>`;
      }).join('');
    }
  },

  // Populate player selector dropdown
  populatePlayerSelector() {
    const sel = document.getElementById('select-player');
    sel.innerHTML = '';
    if (!this.state || this.state.players.length <= 1) {
      sel.classList.add('hidden');
      return;
    }
    sel.classList.remove('hidden');
    for (const p of this.state.players) {
      const opt = document.createElement('option');
      opt.value = p.name;
      opt.textContent = p.name;
      sel.appendChild(opt);
    }
  },

  // Start adventure from state
  startAdventure(state) {
    this.state = state;
    document.getElementById('select-model').value = state.model;
    this.renderStatusBar();
    this.renderDiscoveries();
    this.populatePlayerSelector();
    this.showScreen('screen-adventure');

    // Clear narrative
    document.getElementById('narrative').innerHTML = '';

    // Replay recent messages from history (last 10)
    const recent = state.conversationHistory.slice(-10);
    for (const msg of recent) {
      const text = typeof msg.content === 'string' ? msg.content : msg.content.map(c => c.text || '').join('');
      if (msg.role === 'assistant') {
        const el = this.addNarratorMessage('');
        el.textContent = cleanNarrativeText(text);
      } else {
        // Parse player name from "[Name]: message" format
        const playerMatch = text.match(/^\[([^\]]+)\]:\s*(.*)/s);
        if (playerMatch) {
          this.addPlayerMessage(playerMatch[1], playerMatch[2]);
        } else {
          this.addSystemMessage(text);
        }
      }
    }

    if (state.conversationHistory.length === 0) {
      // New game — send initial prompt
      this.sendInitialPrompt();
    }
  },

  async sendInitialPrompt() {
    if (!this.state) return;
    this.isSending = true;

    const playerDescs = this.state.players.map(p => {
      const d = p.dragons[0];
      return `${p.name} chose a ${d.element} egg and named their dragonette "${d.name}"`;
    }).join('. ');

    const initMsg = `[System]: The adventure begins. ${playerDescs}. They are at the First Choice Stable. The berry has been fed and the bond is formed. Set the scene and begin the adventure. Welcome the keeper(s) warmly.`;

    const msgEl = this.addNarratorMessage('');
    let fullText = '';

    try {
      const body = await sendMessage(this.state, initMsg);
      const reader = body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.text) {
              fullText += data.text;
              // During streaming, just update text — no image parsing or TTS
              msgEl.textContent = cleanNarrativeText(fullText);
              document.getElementById('narrative').scrollTop = document.getElementById('narrative').scrollHeight;
            }
          } catch (e) {}
        }
      }

      this.state.conversationHistory.push({ role: 'assistant', content: fullText });
      const stateUpdates = parseGameState(fullText);
      applyStateUpdates(this.state, stateUpdates);
      // Final render: clean text + images + TTS (once, after stream completes)
      this.renderNarratorFinal(msgEl, fullText);
      this.renderStatusBar();
      saveAdventure(this.state);
    } catch (err) {
      msgEl.textContent = '[Error: ' + err.message + ']';
    }

    this.isSending = false;
  },

  init() {
    // Welcome screen
    document.getElementById('btn-new-adventure').addEventListener('click', () => {
      this.onboardingState = { playerCount: 0, players: [], currentPlayerIndex: 0 };
      this.showScreen('screen-players');
    });

    document.getElementById('btn-load-adventure').addEventListener('click', () => {
      this.renderLoadScreen();
      this.showScreen('screen-load');
    });

    // Player count
    document.querySelectorAll('.btn-count').forEach(btn => {
      btn.addEventListener('click', () => {
        this.onboardingState.playerCount = parseInt(btn.dataset.count);
        // Build name inputs
        const container = document.getElementById('name-inputs');
        container.innerHTML = '';
        for (let i = 0; i < this.onboardingState.playerCount; i++) {
          const input = document.createElement('input');
          input.type = 'text';
          input.className = 'text-input';
          input.placeholder = `Keeper ${i + 1} name`;
          input.maxLength = 20;
          input.autocomplete = 'off';
          container.appendChild(input);
        }
        this.showScreen('screen-names');
        container.querySelector('input').focus();
      });
    });

    // Names done
    document.getElementById('btn-names-done').addEventListener('click', () => {
      const inputs = document.querySelectorAll('#name-inputs input');
      const names = Array.from(inputs).map(i => i.value.trim()).filter(Boolean);
      if (names.length !== this.onboardingState.playerCount) {
        // Highlight empty ones
        inputs.forEach(i => { if (!i.value.trim()) i.style.borderBottomColor = '#FF4136'; });
        return;
      }
      this.onboardingState.players = names.map(name => ({
        name,
        dragons: [],
        badges: 0,
        items: [],
        customElement: null,
      }));
      this.onboardingState.currentPlayerIndex = 0;
      this.showEggPicker();
    });

    // Egg selection
    document.querySelectorAll('.egg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.egg-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const element = btn.dataset.element;
        const idx = this.onboardingState.currentPlayerIndex;
        this.onboardingState.players[idx].selectedElement = element;

        // Move to dragon naming
        document.getElementById('dragon-element-label').textContent = element.charAt(0).toUpperCase() + element.slice(1);
        document.getElementById('input-dragon-name').value = '';
        this.showScreen('screen-dragon-name');
        document.getElementById('input-dragon-name').focus();
      });
    });

    // Dragon named
    document.getElementById('btn-dragon-named').addEventListener('click', () => this.finishDragonNaming());
    document.getElementById('input-dragon-name').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.finishDragonNaming();
    });

    // Load screen
    document.getElementById('save-list').addEventListener('click', (e) => {
      const archiveBtn = e.target.closest('.save-archive');
      if (archiveBtn) {
        e.stopPropagation();
        archiveAdventure(archiveBtn.dataset.id);
        this.renderLoadScreen();
        return;
      }
      const entry = e.target.closest('.save-entry');
      if (entry) {
        const state = loadAdventure(entry.dataset.id);
        if (state) this.startAdventure(state);
      }
    });

    // Archived list — restore
    document.getElementById('archived-list').addEventListener('click', (e) => {
      const unarchiveBtn = e.target.closest('.save-unarchive');
      if (unarchiveBtn) {
        e.stopPropagation();
        unarchiveAdventure(unarchiveBtn.dataset.id);
        this.renderLoadScreen();
        return;
      }
      // Allow clicking archived entries to load them too
      const entry = e.target.closest('.save-entry');
      if (entry) {
        const state = loadAdventure(entry.dataset.id);
        if (state) this.startAdventure(state);
      }
    });

    document.getElementById('btn-back-welcome').addEventListener('click', () => {
      this.showScreen('screen-welcome');
    });

    // Adventure screen controls
    document.getElementById('btn-send').addEventListener('click', () => this.send());
    document.getElementById('input-message').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); }
    });

    // Model selector
    document.getElementById('select-model').addEventListener('change', (e) => {
      if (this.state) {
        this.state.model = e.target.value;
        saveAdventure(this.state);
      }
    });

    // Save button
    document.getElementById('btn-save').addEventListener('click', () => {
      if (this.state) {
        saveAdventure(this.state);
        this.addSystemMessage('Adventure saved.');
      }
    });

    // New adventure from game screen
    document.getElementById('btn-new').addEventListener('click', () => {
      if (this.state) saveAdventure(this.state);
      this.state = null;
      this.showScreen('screen-welcome');
    });

    // Mic button
    const micBtn = document.getElementById('btn-mic');
    const flashPlaceholder = (msg) => {
      const input = document.getElementById('input-message');
      input.placeholder = msg;
      setTimeout(() => { input.placeholder = 'What do you do?'; }, 2500);
    };

    micBtn.addEventListener('mousedown', async () => {
      const ok = await startRecording();
      if (ok) {
        micBtn.classList.add('recording');
      } else {
        flashPlaceholder('Mic access denied');
      }
    });
    micBtn.addEventListener('touchstart', async (e) => {
      e.preventDefault();
      const ok = await startRecording();
      if (ok) {
        micBtn.classList.add('recording');
      } else {
        flashPlaceholder('Mic access denied');
      }
    });

    const stopAndTranscribe = async () => {
      if (!isRecording) return;
      isRecording = false; // clear immediately to prevent double-fire
      micBtn.classList.remove('recording');
      const blob = await stopRecording();
      if (!blob || blob.size < 1000) {
        flashPlaceholder('Hold longer to record');
        return;
      }

      const input = document.getElementById('input-message');
      input.placeholder = 'Transcribing...';

      try {
        const text = await transcribeAudio(blob);
        if (text) {
          input.value = text;
          input.focus();
        }
        input.placeholder = 'What do you do?';
      } catch (err) {
        console.error('Transcription error:', err);
        flashPlaceholder('Transcription failed — try again');
      }
    };

    micBtn.addEventListener('mouseup', stopAndTranscribe);
    micBtn.addEventListener('mouseleave', stopAndTranscribe);
    micBtn.addEventListener('touchend', stopAndTranscribe);

    // TTS toggle
    this.initTTS();
    document.getElementById('btn-tts').addEventListener('click', () => {
      this.ttsEnabled = !this.ttsEnabled;
      document.getElementById('btn-tts').textContent = this.ttsEnabled ? 'Voice: On' : 'Voice: Off';
      if (!this.ttsEnabled) this.stopSpeaking();
    });

    // Discoveries toggle
    document.getElementById('btn-toggle-discoveries').addEventListener('click', () => {
      document.getElementById('discoveries-list').classList.toggle('hidden');
    });

    // Enter key on name inputs
    document.getElementById('name-inputs').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('btn-names-done').click();
      }
    });

    // iOS keyboard: resize adventure screen so input stays visible
    if (window.visualViewport) {
      const onViewportResize = () => {
        const adventureScreen = document.getElementById('screen-adventure');
        if (!adventureScreen.classList.contains('active')) return;
        adventureScreen.style.height = window.visualViewport.height + 'px';
        // Scroll narrative to bottom when keyboard opens
        const narrative = document.getElementById('narrative');
        narrative.scrollTop = narrative.scrollHeight;
      };
      window.visualViewport.addEventListener('resize', onViewportResize);
      window.visualViewport.addEventListener('scroll', onViewportResize);
    }
  },

  showEggPicker() {
    const idx = this.onboardingState.currentPlayerIndex;
    const player = this.onboardingState.players[idx];
    document.getElementById('egg-picker-name').textContent = player.name;
    document.querySelectorAll('.egg-btn').forEach(b => b.classList.remove('selected'));
    this.showScreen('screen-eggs');
  },

  finishDragonNaming() {
    const name = document.getElementById('input-dragon-name').value.trim();
    if (!name) {
      document.getElementById('input-dragon-name').style.borderBottomColor = '#FF4136';
      return;
    }

    const idx = this.onboardingState.currentPlayerIndex;
    const player = this.onboardingState.players[idx];
    player.dragons.push({
      name: name,
      element: player.selectedElement,
      customElement: null,
      items: ['berry'],
    });
    delete player.selectedElement;

    // Next player or start game
    this.onboardingState.currentPlayerIndex++;
    if (this.onboardingState.currentPlayerIndex < this.onboardingState.playerCount) {
      this.showEggPicker();
    } else {
      // All players ready — create adventure
      const model = 'claude-sonnet-4-5-20250929';
      const state = createAdventure(this.onboardingState.players, model);
      saveAdventure(state);
      this.startAdventure(state);
    }
  },
};

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => app.init());
