/* ═══════════════════════════════════════════
   DRACO ADVENTURE — Game Logic
   ═══════════════════════════════════════════ */

// ── Condensed Game Bible (system prompt insert) ──

const GAME_BIBLE = `# DRACO — Game Rules & Lore

## Core Concepts
- **Dragonettes**: Baby dragons that hatch at full adult size. Elemental powers, distinct personalities.
- **Keepers**: Human players who bond with, train, and race dragonettes.
- **Dragonette Master**: Title earned by collecting 10 racing badges and defeating Draco.
- **Goal**: Collect dragons, win races, earn 10 badges, defeat Draco.

## Elements

### Standard (available at First Choice Stable)
- **Fire** — Red/orange. Breathes fire. Extremely effective vs shelled enemies (2 hits vs 100). Weak to Water.
- **Water** — Blue. Water-based powers. Weak to Grass.
- **Grass** — Green. Razor leaves, leaf walls. Strong vs Thunder Cloud. Weak to Fire.
- **Electric** — Yellow. Electrical attacks. Similar to Thunder Cloud.
- **Psychic** — Purple with pink stripes. Telekinesis, making things vanish, unlocking doors. Does NOT read minds.
- **Spirit** — Dark purple, forehead gem. Truth sensing, illusions, purple beam from gem. Encompasses ghost/Halloween powers. Silver Moonlight power only works at night.

### Special
- **Speed** — Golden. Top speed 270 mph (normal: 50 mph). Banned from races.
- **Power** — Rainbow. Has ALL element abilities (weaker versions). Speed matches Speed dragons. Weak to Thunder Cloud and Electric. Banned from races.
- **Thunder Cloud** — Only obtainable by defeating Draco. Lightning feathers release charged particles that generate thunder and lightning.

### Advanced (Locked)
- **Universe** — Microscopic star map and compass on body. One-hit shell crush ability.
- **Cosmic** — Space map appearance (nebulae, constellations). Similar powers to Universe.
- **Egg** — Always carries an egg on top. Forces other dragons back into eggs, resetting all training.
- **Wood** — Details unknown. Locked.
- **Starlight** — Details unknown. Locked.

### Custom Element Rule
Every player MUST invent their own unique element. This is a core rule — creativity is built into the game. Example: "Power Breathing" degrades opponent attack power by 10 points.

There are ~1000 elements total. Most are locked and undiscovered.

### Elemental Cycle
Grass → weak to Fire → weak to Water → weak to Grass.
Power weak to Thunder Cloud and Electric.
Dragon Scale weak to Fire.
Thunder Cloud weak to Grass.

## Getting Your First Dragon
1. Visit the First Choice Stable (eggs with berries on top)
2. Choose ONE egg (Fire, Water, Grass, Electric, Psychic, or Spirit only)
3. Egg hatches — full-sized dragonette emerges
4. Hand-feed the berry to bond the dragon to you

## Taming Wild Dragons
1. Place element crystals on the dragon's wing crystal slots
2. Feed berry and/or element candy
Full crystal slots + feeding = full bond. Feeding before crystals = weaker bond.

### Breed Dragons
Different elements can breed, producing hybrids with combined powers. Known: Spirit-Grass Breed (Grass Spirit Army attack drains 10%, strong vs Thunder Cloud). Requires a Breed Berry to tame.

### Keeper Transformation
With a Dragon Eye Amulet and deep bond, a Keeper can physically transform into one of their dragons while retaining their own mind.

## Items
- **Berries** — Bond dragons. Found on eggs at stable, in nests, on berry plants (vines with ancient markings).
- **Element Crystals** — Fill wing crystal slots for bonding.
- **Element Candy** — Helps complete bonding.
- **Special Berries** — From Tow Road's dimension. Makes dragon slightly faster.
- **Dragon Scale** — From shelled enemies. Creates force fields. Weak to fire.
- **Breed Berry** — For taming hybrid dragons only.
- **Snake Snacks** — Grants poisonous powers (banned from races, OK in combat).
- **Rabbit Meat** — Dropped by Jack O'Rabbit. Dragon consumable.
- **Rabbit Skull** — From Jack O'Rabbit. Summons skeleton Dragon to tame.
- **Power-Up Potion** — Makes dragons stronger. Tastes gross. Earned at Master rank.
- **Turtle Meat** — From Tow Road. Consumable power boost.
- **Badges** — Won in races. 10 needed to challenge Draco.
- **Dragon Eye Amulet** — Glowstone with dragon eye. Summon dragons, enable transformation.
- **The Crystal** — Look through it at a dragon to reveal its powers.

## Racing
- Takes place in stadiums built by Aloha
- Win by flying through flashing trophy at the right moment
- Power and Speed dragons BANNED (too fast)
- Poisonous powers BANNED from races
- Team Mode or Solo Mode available
- Teammates share abilities (can pass through each other's obstacles)
- Obstacles allowed as strategy (leaf walls, illusions, etc.)
- Race Drone announces races, manages countdown, can change color for special events
- Different races award different named trophies

## Combat
- Dragons start at 100% attack power per battle, recharge after
- Shelled enemies: non-fire = ~1% damage/hit, fire = 2 hits to defeat
- Power Breathing: degrades opponent by 10 points per hit
- Grass Spirit Army: drains 10% per use (Spirit-Grass breed only)
- Speed Atmosphere: launches enemies into space (counters magnetism-based enemies)
- Clone Mechanic: some enemies clone when attacked; clones grow via Earth's magnetism, can't grow in space

## Key Characters
- **Aloha** — Female humanoid robot. Race announcer, enforcer, stadium builder. Gray, laundry-basket head, long neck, orange eyes, expandable mouth. Uses hologram iPhone.
- **Wonky Donkers** — Bumbling villain. Skinny, huge cheeks, tiny eyebrows, black hair, tan skin. Always tries to sneak banned dragons into races with cardboard disguises. Always gets caught.
- **The Finisher** — Ally, male, joins player's racing team.
- **Snake Friend** — Friendly snake in forest clearing. Gives snake snacks (poisonous powers).
- **Flash Dragon** — Aza's sleek racing dragon.

## Enemies
- **Draco** — Thunder Cloud Dragon, final boss. Controlled by evil shell (pure dragon scale energy) connected to mysterious evil voice. Not inherently evil. Weak to Grass. Drops: Thunder Cloud element, tamed post-defeat. Need 10 badges to challenge.
- **Tow Road** — Giant evil flying turtle, dragon-scale-energy shell. Fire weakness. Drops: dragon scale, turtle meat. Has its own dimension with special berries.
- **Evil Groundhog** — Very long, shelled, winged. Dragon scale energy shell.
- **Jack O'Rabbit** — Giant fuzzy rabbit, skull head (acts as shield). Creates clones when attacked. Clones grow via Earth's magnetism. Counter: launch to space. Fire works but causes more clones. Drops: rabbit meat, dragon skill, rabbit skull.

## Progression
1. First Choice Stable → bond first dragon
2. Adventure → explore, encounter enemies, find dragons
3. Tame more dragons (crystals, berries, candy, care)
4. Race → earn badges (10 needed)
5. Challenge Draco → defeat to become Dragonette Master
6. Post-game: continue with Thunder Cloud unlocked, power-up potions, more adventures`;


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

${GAME_BIBLE}

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

function deleteAdventure(id) {
  localStorage.removeItem('draco_adventure_' + id);
  const index = JSON.parse(localStorage.getItem('draco_adventures') || '[]');
  localStorage.setItem('draco_adventures', JSON.stringify(index.filter(e => e.id !== id)));
}

function getSavedAdventures() {
  return JSON.parse(localStorage.getItem('draco_adventures') || '[]')
    .sort((a, b) => new Date(b.lastPlayedAt) - new Date(a.lastPlayedAt));
}


// ── Conversation Compression ──

async function compressHistory(state) {
  if (state.conversationHistory.length <= 30) return;

  // Keep the most recent 20 messages
  const toCompress = state.conversationHistory.slice(0, -20);
  const toKeep = state.conversationHistory.slice(-20);

  // Build a summary from the compressed messages
  const summaryText = toCompress.map(m => {
    const role = m.role === 'assistant' ? 'Narrator' : 'Player';
    const text = typeof m.content === 'string' ? m.content : m.content.map(c => c.text || '').join('');
    // Truncate very long messages
    return `${role}: ${text.slice(0, 200)}`;
  }).join('\n');

  // Prepend to existing summary
  const newSummary = state.narrativeSummary
    ? state.narrativeSummary + '\n\n--- Earlier events ---\n' + summaryText.slice(0, 2000)
    : summaryText.slice(0, 2000);

  state.narrativeSummary = newSummary;
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
    .trim();
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

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
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

function stopRecording() {
  return new Promise((resolve) => {
    if (!mediaRecorder || mediaRecorder.state !== 'recording') {
      resolve(null);
      return;
    }
    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      // Stop all tracks
      mediaRecorder.stream.getTracks().forEach(t => t.stop());
      isRecording = false;
      resolve(blob);
    };
    mediaRecorder.stop();
  });
}

async function transcribeAudio(blob) {
  const formData = new FormData();
  formData.append('file', blob, 'recording.webm');
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

    // Determine current player (cycle through players by turn count)
    const playerIndex = (this.state.turnCount) % this.state.players.length;
    const playerName = this.state.players[playerIndex].name;

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
              // Display cleaned text (strip tags) as it streams
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

      // Final clean display
      msgEl.textContent = cleanNarrativeText(fullText);

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
      return;
    }
    list.innerHTML = saves.map(s => {
      const date = new Date(s.lastPlayedAt).toLocaleDateString();
      return `<div class="save-entry" data-id="${s.id}">
        <div>
          <div class="save-name">${escapeHtml(s.playerNames.join(' & '))}</div>
          <div class="save-meta">${s.badges} badges · ${date}</div>
        </div>
        <button class="save-delete" data-id="${s.id}" title="Delete">x</button>
      </div>`;
    }).join('');
  },

  // Start adventure from state
  startAdventure(state) {
    this.state = state;
    document.getElementById('select-model').value = state.model;
    this.renderStatusBar();
    this.renderDiscoveries();
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
              msgEl.textContent = cleanNarrativeText(fullText);
              document.getElementById('narrative').scrollTop = document.getElementById('narrative').scrollHeight;
            }
          } catch (e) {}
        }
      }

      this.state.conversationHistory.push({ role: 'assistant', content: fullText });
      const stateUpdates = parseGameState(fullText);
      applyStateUpdates(this.state, stateUpdates);
      msgEl.textContent = cleanNarrativeText(fullText);
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
      const deleteBtn = e.target.closest('.save-delete');
      if (deleteBtn) {
        e.stopPropagation();
        deleteAdventure(deleteBtn.dataset.id);
        this.renderLoadScreen();
        return;
      }
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
    micBtn.addEventListener('mousedown', async () => {
      const ok = await startRecording();
      if (ok) micBtn.classList.add('recording');
    });
    micBtn.addEventListener('touchstart', async (e) => {
      e.preventDefault();
      const ok = await startRecording();
      if (ok) micBtn.classList.add('recording');
    });

    const stopAndTranscribe = async () => {
      if (!isRecording) return;
      micBtn.classList.remove('recording');
      const blob = await stopRecording();
      if (!blob || blob.size < 1000) return; // too short

      const input = document.getElementById('input-message');
      input.placeholder = 'Transcribing...';

      try {
        const text = await transcribeAudio(blob);
        if (text) {
          input.value = text;
          input.focus();
        }
      } catch (err) {
        console.error('Transcription error:', err);
      }
      input.placeholder = 'What do you do?';
    };

    micBtn.addEventListener('mouseup', stopAndTranscribe);
    micBtn.addEventListener('mouseleave', stopAndTranscribe);
    micBtn.addEventListener('touchend', stopAndTranscribe);

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
