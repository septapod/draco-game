---
title: "feat: Add Nalia and the Draco Legends chapter"
date: 2026-05-23
status: active
type: feat
depth: standard
origin: docs/brainstorms/nalia-legends-requirements.md
---

# feat: Add Nalia and the Draco Legends Chapter

## Problem Frame

Aza Dixon created a new legendary dragon (Nalia) and asked for a new Draco Legends chapter that catalogs all of Draco's legends. The current Codex has 9 chapters and 15 dragon cards but no concept of "legend tier." Nalia introduces:

- A new dragon (two forms: a loaf-of-bread-sized blue cylinder baby, and a mountain-sized sleeping legendary form)
- A new element (Mountain)
- A new game mechanic (loadout-based taming exclusion)
- A new visual hero moment (snow cap on the sleeping mountain transforms into wings on awakening)
- An additive extension to an existing character's backstory (Marcus / The Finisher raised her as a kid)

The plan integrates all of that across four surfaces (Game Bible, Codex web app, AI-narrated game, image pipeline) without breaking existing canon, without retroactively promoting other dragons to legend status, and without borrowing anything from Dragon Masters.

See origin: `docs/brainstorms/nalia-legends-requirements.md`.

---

## Creative Authority

Aza Dixon is the sole creative authority for Draco lore. Brent documents and ships; Claude implements per Brent's direction. When Aza-stated lore conflicts with prior content, Aza's word wins. The plan flags Aza-pending placeholders explicitly rather than guessing.

---

## Requirements Traceability

Carried forward from origin (`docs/brainstorms/nalia-legends-requirements.md` section 4 success criteria):

- R1. Nalia exists in `DRACO_Game_Bible.md` with all 13 canonical answer dimensions reflected.
- R2. A new Legends chapter renders in `codex/index.html` with its own nav entry and a Nalia card visually distinct from the dragon grid.
- R3. Mountain is a first-class element: matchup chart entry, CSS color var, glossary entry, element badge, and `ELEMENT_COLORS` parity in `codex/game.js`.
- R4. Marcus's character entry is extended additively (existing "injured dragon" line untouched).
- R5. The AI game system prompt knows Nalia, Mountain, the loadout taming exclusion, the eternal-singular constraint, the Chromatic variant, and the Marcus extension.
- R6. Image prompts staged for mountain Nalia sleeping, mountain Nalia waking, and (optional) Chromatic Nalia. Baby Nalia prompt deferred until Aza's drawing arrives.
- R7. Codex footer version bumps from v1.6 to v1.7.
- R8. `PROJECT_STATUS.md` updated.

Hard constraints carried forward (origin sections 2 and 6):

- Zero borrowing from Dragon Masters.
- Draco and Power Up are NOT legends; launch the chapter with Nalia only.
- No "Legend" badges retroactively added to existing dragon cards.
- Marcus's existing "injured dragon" backstory is preserved untouched; Nalia paragraph is additive.
- Nalia is singular and eternal: no eggs, no other Nalias, no baby Nalia encounters in-game.
- Loadout exclusion is party-based (active party), not collection-based (storage is fine).
- No em dashes in any prose authored by this plan or its implementation.
- Image generation never runs inside the conversation. Prompts are staged; Brent executes the script.

---

## Key Technical Decisions

**Legend card pattern (new class, not reused).** A new `.legend-card` CSS class with a more vertical, lore-forward layout than `.dragon-card`. Aza asked for a chapter that "feels more legendary than just another dragon," and reusing the existing flip card would dilute that signal. Cost is roughly one CSS block plus one HTML block. Confirmed with Brent in Phase 5.1.5 synthesis.

**Mountain discoverability in Chapter II (Elements).** A one-line Mountain entry in the Elements chapter with a pointer to the Legends chapter, so the element system has a single canonical home in addition to Nalia's legend card. Confirmed with Brent in Phase 5.1.5 synthesis.

**Chapter placement: insert between Journey (VIII) and Secrets (IX).** Legends becomes the new Chapter IX; the existing Secrets chapter shifts to Chapter X. This preserves Secrets as the final-reveal chapter while landing Legends in a thematically coherent slot. Flagged for Brent to confirm with Aza (see Open Decisions).

**Aza-pending content stays as explicit placeholders.** Mountain matchup arrays, baby Nalia image, chosen Mountain hex color, and Chromatic Nalia typing are left as clearly labeled TODOs inside the implementation rather than blocking the plan. Implementer leaves a brief inline note at each placeholder so subsequent passes can find them with a single grep.

**Lore lands in the Game Bible first.** Unit U1 ships canonical lore before downstream surfaces consume it. This avoids re-stating lore inconsistencies during web/game integration; the Bible is the only place lore is "decided" and other surfaces mirror it.

**Verification is manual.** The project has no automated test framework by design. Verification scenarios in each unit name specific browser, narrator, or content checks. No test files are introduced.

**Edit, not Write, for existing files.** All updates to existing files use the Edit tool (or equivalent exact-match replacement) to prevent silent overwrites of Aza's prior canon, especially in `DRACO_Game_Bible.md`, `codex/game.js`, and `codex/index.html`.

---

## Implementation Units

### U1. Game Bible v1.7: Nalia lore, Mountain element, Legends section, Marcus extension

**Goal.** Establish canonical Nalia lore in `DRACO_Game_Bible.md` so all downstream surfaces (Codex, game.js, image prompts) mirror a single source.

**Requirements.** R1, R4 (Marcus extension paragraph), R7 (version line in the Bible header).

**Dependencies.** None.

**Files.**
- `DRACO_Game_Bible.md` (modify)

**Approach.**
- Add a new top-level section "Draco Legends" near the existing legendary-flavor content. Subsection per legend; launch with Nalia only.
- Nalia subsection covers all 13 canonical dimensions from `docs/aza-answers-nalia.md`: pronunciation, gender, baby form (cylinder, blue, two wings, two tiny claws, two tiny paws, two cute eyes, medals, loaf-of-bread size), mountain form (closed calm eyes, forest on back, snow cap that becomes wings on waking, one animal shelter, otherwise no buildings, caves inside), element (Mountain), tamer (Marcus, raised her as a kid, released her, she visits him during her wake year), awards (Dragon Racing and Cutest Dragon, hundreds upon hundreds in each), evolution (natural overnight), sleep cycle (2,000,000 years asleep, 1 year awake, repeats), wake-year activities (helps other dragons, flies, visits Marcus, fights The Voice Below and Wonky Donkers), no reproduction (singular and eternal), diet (Chromatic Fields fruit, scaled for her size; over a million normal fruit equivalent to fill her), bond type (team's best friend or individual best friend), encounter rules (mountain form only, loadout exclusion), Chromatic variant.
- Add Mountain to the elements list/section, with a stub for matchups marked "(Aza-pending: strong vs / weak vs)" and a one-line color cue placeholder.
- Extend Marcus (The Finisher) glossary and character entry with one additive paragraph about raising Nalia. Do NOT alter the existing "injured dragon during a race" sentence; the Nalia paragraph stands beside it.
- Bump version line (currently v1.6) to v1.7. Update any changelog block if one exists.

**Patterns to follow.** Mirror existing section structure and tone in `DRACO_Game_Bible.md`. Section length comparable to existing legendary lore entries. No em dashes; use periods, commas, or parentheses.

**Test scenarios (manual verification).**
- Grep for "Nalia" in the file. Returns the new section plus any cross-references in Marcus's entry. No stray references elsewhere.
- Grep for "Dragon Masters" in the file. Returns zero results.
- Grep for "Griffith" in the file. Returns zero results.
- Grep the diff for the em dash character (Unicode U+2014). Returns zero results.
- Marcus's existing "injured dragon" sentence is present and unmodified. Diff is purely additive.
- Version line shows v1.7.
- Aza reads the Nalia subsection aloud and confirms it matches his canon. (Stretch verification; Brent's call.)

**Verification.** The Bible reads top-to-bottom as canonical lore that Aza recognizes as his world. Marcus's prior canon is intact. Mountain element placeholder is unambiguous about what is Aza-pending. Covers R1, R4, R7.

---

### U2. Mountain element web infrastructure

**Goal.** Add Mountain as a first-class element in the Codex visual system and matchup chart, with explicit placeholders where Aza's content is pending.

**Requirements.** R3, plus Mountain discoverability in Chapter II (Key Technical Decisions).

**Dependencies.** U1 (Bible defines Mountain's existence).

**Files.**
- `codex/style.css` (modify: add `--mountain` CSS color var)
- `codex/index.html` (modify: add Mountain matchup button in Chapter II, plus one-line Mountain entry in the Elements chapter body with a pointer to the Legends chapter)
- `codex/script.js` (modify: add Mountain entry to the `matchups` object near line 415)

**Approach.**
- In `codex/style.css`, add a new CSS variable `--mountain` near the existing element color vars. Initial value: a placeholder hex (e.g., `#7A6A5A` slate-ochre) with a comment marking it as Aza-pending. Implementer documents the placeholder in the diff so Brent can swap it after Aza picks.
- In `codex/index.html` Chapter II (Elements), follow the existing matchup-button pattern (`.matchup-btn`) to add a Mountain button. Include the element in any visible element list/legend with a one-line description and a pointer link to the Legends chapter (`<a href="#legends">`).
- In `codex/script.js`, extend the `matchups` object with a `mountain` key. Strong-against and weak-against arrays are empty arrays with an inline `// TODO: Aza to decide` comment plus a short note in the matchup-result text ("Aza has not yet decided Mountain's matchups.") so the live chart shows the gap honestly rather than silently breaking.
- Audit existing matchup entries for any element that should plausibly reference Mountain in its own strong/weak arrays. Leave a single grouped TODO note in `script.js` listing the affected elements ("when Aza picks Mountain matchups, mirror reciprocals here") rather than touching them now.

**Patterns to follow.** Existing CSS element variables in `codex/style.css`. Existing `.matchup-btn` pattern in Chapter II of `codex/index.html`. Existing `matchups` object shape in `codex/script.js` near line 415.

**Test scenarios (manual verification).**
- Open `codex/index.html` in a browser. Chapter II shows a Mountain matchup button styled consistently with the other 13 element buttons.
- Click the Mountain button. The matchup-result area renders, displays the Aza-pending message, and does NOT throw a JS console error.
- Click each other element button in turn. Each still works exactly as before (no regression from the new element key).
- Inspect the CSS. `--mountain` is defined; no other element vars were edited.
- Inspect Chapter II body. Mountain appears in the elements list with a one-line description and a link to `#legends` that scrolls to the Legends chapter (verified after U3 lands).

**Verification.** Mountain is visibly present in the matchup chart and Elements chapter without breaking any existing element behavior. All Aza-pending placeholders are labeled clearly and findable via grep on `TODO: Aza`. Covers R3.

---

### U3. Draco Legends chapter scaffold and Nalia legend card

**Goal.** Build the new Legends chapter in the Codex with a single legend card (Nalia) using a new `.legend-card` pattern, and renumber the existing Secrets chapter.

**Requirements.** R2, R7 (footer version bump in the same file).

**Dependencies.** U1 (lore copy lands in Bible first), U2 (Mountain CSS var exists so Nalia's element badge renders correctly).

**Files.**
- `codex/index.html` (modify: insert new `<section id="legends">` between current Chapter VIII Journey and current Chapter IX Secrets; renumber existing Secrets chapter-number span IX to X; add `#legends` to nav; bump footer version to v1.7)
- `codex/style.css` (modify: add new `.legend-card` block plus any supporting layout/scroll-reveal styles for the Legends chapter)

**Approach.**
- Insert a new `<section id="legends">` with a `chapter-number` of "Chapter IX" between the existing Chapter VIII and current Chapter IX. Renumber the existing Secrets chapter-number span from IX to X.
- Build a new `.legend-card` CSS pattern that visually distinguishes a legend from a regular dragon card. Defaults: more vertical, larger element badge, lore-quote treatment, a "Legend" tag, distinct border / glow tied to Mountain element color. Keep the visual contract simple enough that future legends drop in by copying the card block.
- Nalia's legend card includes:
  - Card title "Nalia" with pronunciation note ("NAH-lee-yah") nearby.
  - Element badge: Mountain.
  - Tamer line: Marcus (The Finisher), with a glossary cross-reference.
  - Two visual slots: "Sleeping Mountain Nalia" (image filename matches U6 prompt) and "Waking Nalia" (snow becoming wings; image filename matches U6 prompt). Slot for baby form exists as a labeled placeholder with alt text describing the cylinder/blue/medals appearance until Aza's drawing arrives.
  - Lore body: condensed retelling of the Bible's Nalia entry, focused on the wake cycle, the bond with Marcus, and the encounter rules.
  - Encounter callout: loadout exclusion summary in plain language.
  - Diet line: Chromatic Fields fruit, scaled for her size.
  - Variants note: multicolored Chromatic Nalia, lucky-find in Chromatic Fields.
- Add `<a href="#legends" class="nav-tab" data-color="<mountain-color>">Legends</a>` to the nav block before the existing `#secrets` link.
- Bump footer version string from v1.6 to v1.7.
- Audit `codex/index.html` for any stray references to "Chapter IX" copy that names Secrets specifically and update to "Chapter X." Check `data-color` and anchor links remain consistent.

**Patterns to follow.** Existing chapter section structure in `codex/index.html` (each chapter has `chapter-number`, `chapter-title`, body, scroll-reveal classes). Existing nav-tab block at lines 40 to 51. Existing scroll-reveal classes in `codex/script.js`.

**Test scenarios (manual verification).**
- Open the site. Nav shows World, Elements, First Dragon, Items, Racing, Combat, Characters, Journey, Legends, Secrets, Play (in that order).
- Click "Legends" in the nav. Page scrolls to the new section. Chapter header reads "Chapter IX" and title reads "Draco Legends" (or similar Aza-confirmed title).
- The Nalia legend card renders. Image slots are visible (placeholder graphics or alt text until U6 images land). Lore copy matches Bible. Mountain element badge renders in the Mountain color.
- Click "Secrets" in the nav. Page scrolls to Secrets. Chapter header reads "Chapter X." All prior Secrets content is intact.
- Footer shows "Game Bible v1.7."
- Resize browser to mobile width. Legend card collapses gracefully (single column).
- Confirm no console errors. Existing card grids in earlier chapters render normally (no CSS regression from new `.legend-card` rules).
- Verify the Mountain entry in Chapter II's `#legends` pointer (from U2) actually scrolls correctly to this section.

**Verification.** Legends is a real, navigable chapter with a Nalia card that visually reads as legendary, not as "just another dragon card." Secrets is intact at its new IX-to-X position. Covers R2 and R7.

---

### U4. Marcus character card extension and cross-reference glossary entries

**Goal.** Marcus's character card gets an additive Nalia paragraph; the glossary gains entries for Nalia, Mountain, Legend Codex, Chromatic Nalia, and optionally Animal Shelter.

**Requirements.** R4 (web parity for Marcus extension), R1 and R3 indirectly (glossary discoverability).

**Dependencies.** U1 (Bible defines the canonical Marcus extension copy and Mountain element).

**Files.**
- `codex/index.html` (modify: Marcus character card around lines 1026 to 1034, plus glossary section around lines 1535 to 1640)

**Approach.**
- Locate Marcus's character card (`<!-- Marcus (The Finisher) -->` block). Append one new paragraph after the existing description paragraph. Do NOT modify the existing description paragraph. The new paragraph mirrors the Bible's Marcus extension: he found Nalia as a kid, raised her, released her into the world when she was big enough, and their bond persists across her sleep cycles.
- Locate Marcus's glossary entries (two: `data-term="marcus the finisher"` and `data-term="the finisher marcus"`). Append a brief Nalia note to the canonical entry. The "see Marcus (The Finisher)" cross-reference entry stays minimal.
- Add new glossary entries (each as a new `<div class="glossary-entry pixel-border" data-term="...">` block) for:
  - Nalia (full entry: legendary mountain dragon, raised by Marcus, eternal singular being).
  - Mountain (element; weak/strong matchups labeled Aza-pending).
  - Legend Codex (the in-world name for the Legends chapter; references Nalia as the first legend documented).
  - Chromatic Nalia (multicolored variant found in Chromatic Fields; lucky-find).
  - Optional: Animal Shelter (the single structure on sleeping Mountain Nalia; folklore reasoning).
- Insert new glossary entries in alphabetical position to match the existing pattern. The glossary search filter operates on `data-term`, so populate that attribute with lowercase forms.

**Patterns to follow.** Existing `.character-card` markup near line 1026. Existing `.glossary-entry` markup throughout the glossary section. Existing alphabetical ordering of glossary entries.

**Test scenarios (manual verification).**
- Open the site. Find Marcus's character card. Original description paragraph is intact verbatim. New Nalia paragraph appears below it.
- Open the glossary. Use the search box to filter on "nalia." Entry for Nalia appears. Search "mountain." Mountain entry appears. Search "legend codex" and "chromatic nalia" and "marcus." Each filter returns the expected entry.
- Marcus's glossary entry mentions both his original purpose (helping an injured dragon) and his Nalia chapter (additive, not replacing).
- Verify the Mountain glossary entry's wording about matchups is clearly Aza-pending, not silently empty.

**Verification.** All Nalia and Mountain references in the Codex are discoverable via glossary search. Marcus's prior canon is intact. Covers R4.

---

### U5. AI game system prompt updates

**Goal.** The AI narrator in `codex/game.js` knows Nalia lore, the Mountain element, the loadout-based taming exclusion rule, the eternal-singular constraint, the Chromatic variant, and the Marcus extension. No save-state schema changes.

**Requirements.** R5.

**Dependencies.** U1 (lore canonical in Bible).

**Files.**
- `codex/game.js` (modify: GAME_BIBLE constant near line 9, HIDDEN_LORE constant near line 301, ELEMENT_COLORS object near line 710)

**Approach.**
- `GAME_BIBLE` constant gets:
  - A "Draco Legends" section paragraph introducing Nalia with the same canonical facts as the Bible. Keep it tight; the constant is already large.
  - A Mountain element addition in the elements block, with Aza-pending matchup language so the narrator does not invent matchup rules.
  - A Marcus extension paragraph mirroring U1, additive to whatever Marcus content already exists.
- `HIDDEN_LORE` constant gets new narrator behavioral rules in the same shape as existing rules (e.g., the "Voice Below always survives" and "Voice Below speaks plural" rules):
  - Nalia eternal-singular rule: there is only one Nalia. She does not lay eggs. There are no baby Nalia encounters in any era of any adventure. If a player tries to find a baby Nalia, the narrator gently redirects them to legend / Marcus's memory.
  - Loadout exclusion rule for taming Nalia: if the player party in the current adventure contains a legendary dragon or a Chromatic dragon, they cannot find or tame Nalia on this journey. The narrator surfaces this in-fiction (an NPC warning, an environmental sign, a refusal from Nalia herself) rather than as a popup rule. Owning these dragons is fine; the restriction is the active party.
  - Chromatic Nalia variant rule: a lucky-find in the Chromatic Fields. Implementer leaves a brief in-prompt note on luck framing so the narrator does not over-trigger.
  - Voice Below and Wonky Donkers connection: during Nalia's wake year, she fights both. Useful crossover hook the narrator may surface.
- `ELEMENT_COLORS` object gets `mountain: '<value matching CSS var from U2>'`. If the U2 var is still a placeholder, the ELEMENT_COLORS entry uses the same placeholder hex with a matching comment.
- Verify no existing model migrations or schema flags in `game.js` need updating (the `players[].dragons[]` shape already accommodates a Nalia entry the same as any other dragon).

**Patterns to follow.** Existing `GAME_BIBLE` and `HIDDEN_LORE` constant structure in `codex/game.js`. Existing narrator behavioral rules format (one-paragraph rules with a clear constraint and an in-fiction handling note). Existing `ELEMENT_COLORS` object shape near line 710.

**Test scenarios (manual verification).**
- Start a new AI-game adventure via `codex/game.html`. Ask the narrator: "Tell me about the legend Nalia." Narrator responds with canon-consistent lore (mountain dragon, raised by Marcus, eternal, sleeps 2,000,000 years).
- Within the same adventure, instruct: "I want to find baby Nalia." Narrator refuses gracefully and refers to her as already grown / legend-era, not "she's not implemented."
- Start an adventure with the player party deliberately including a legendary or Chromatic dragon. Ask to seek Nalia. Narrator surfaces the loadout exclusion in-fiction (warning, environmental sign, or Nalia's refusal). Does not allow taming.
- Start a fresh adventure with no legendary or Chromatic in party. Ask to find Nalia. Narrator allows the journey to proceed (mechanic exists; the encounter can play out).
- Ask the narrator about the Mountain element. Narrator describes it as Nalia's element with matchup ambiguity acknowledged (matches the Aza-pending state).
- Inspect a save in localStorage after the first adventure. State schema looks like prior saves with no shape regression.

**Verification.** The narrator handles Nalia, Mountain, taming exclusion, and the eternal-singular constraint with no scripted brittleness. Covers R5.

---

### U6. Image prompts staged in `codex/generate-images.js`

**Goal.** Stage three new image prompts for Nalia's mountain forms (and optionally the Chromatic variant). No generation runs in this skill; Brent fires the script after Aza's drawing arrives.

**Requirements.** R6.

**Dependencies.** U1 (canonical visual descriptors in Bible).

**Files.**
- `codex/generate-images.js` (modify: extend the `images` array)

**Approach.**
- Add three new entries to the `images` array following the existing pattern (each entry has a filename and a prompt string):
  1. `nalia-mountain-sleeping.png`. Prompt describes a calm sleeping dragon shaped like a mountain at dusk, with a thick forest covering her back, a snow-capped peak, two closed eyes that read as serene, a single small animal shelter tucked into the slope, no other buildings, the rest of the landscape untouched and respectful. Style: 8-bit retro pixel art, 1024x1024, matching the existing Codex art direction.
  2. `nalia-mountain-waking.png`. Prompt describes the same dragon partially awake: the snow cap dissolving and lifting upward into vast wings, the eyes opening, the mountain silhouette taking on dragon shape, dawn light, a hero moment. Same style and dimensions.
  3. Optional, comment-flagged for later: `nalia-chromatic.png`. Prompt describes a multicolored variant of the sleeping mountain dragon in the Chromatic Fields, rainbow-banded forest on her back, distinct from the standard form. Mark as deferred until the two primary images ship cleanly.
- Do NOT add a baby Nalia prompt. Wait for Aza's hand drawing.
- Do NOT execute the script. Brent runs `node codex/generate-images.js` from his shell with the OpenAI API key loaded.
- Keep prompts faithful to the Bible. Do not invent visual details Aza did not approve (no Dragon Masters borrowing; no surprise weapons, mounts, or riders).

**Patterns to follow.** Existing entries in the `images` array of `codex/generate-images.js` (style, length, file-naming convention). The CLAUDE.md image workflow section (lines 49 to 56) for how the script is run.

**Test scenarios (manual verification).**
- Open `codex/generate-images.js`. The new entries appear at the end of the `images` array with valid filenames and prompts.
- Lint check: no syntax errors, file parses (`node --check codex/generate-images.js`).
- Read each prompt aloud. Each names the canonical visual elements from the Bible (forest on back, snow cap that becomes wings, calm closed eyes, animal shelter) without inventing details.
- Confirm no prompt references "Dragon Masters" or any borrowed IP.

**Verification.** The script is ready to run once Aza's image budget aligns. The two mountain prompts capture Nalia's signature visuals; the chromatic variant is queued. Baby Nalia is intentionally absent. Covers R6.

---

## Scope Boundaries

### In scope

All work described in Implementation Units U1 through U6. The Codex deploys via Vercel as a static site; no build-step changes needed.

### Deferred to Follow-Up Work

- Generating the actual Nalia images. Brent runs the existing image script after Aza approves the prompts and provides the baby drawing.
- Filling in the Mountain element matchup arrays once Aza decides strong-against and weak-against pairings.
- Choosing a final Mountain element hex color (Brent and Aza pick).
- Resolving Chromatic Nalia variant typing (still Mountain, or gains a Chromatic element). Image prompt three is deferred until this resolves.
- Adding new legends besides Nalia. Aza will invent these with Brent and Claude later.
- Photographing Aza's cardboard cutouts of baby Nalia and sleeping Mountain Nalia as additional visual reference.

### Deferred for later (carried from origin)

- A separate Legends-only sub-site or codex. Aza explicitly chose integration over separation.
- A formal "luck" mechanic for the Chromatic variant. Narrator handles it via in-fiction framing in U5.

### Outside this product's identity (carried from origin)

- Any borrowing from Dragon Masters (names, characters, mechanics, terminology). Hard prohibition.
- Retroactive "Legend" badges on the existing 15 dragon cards. Aza's no is final.
- Promoting Draco or Power Up to legend status. They stay where they are.
- Egg-laying or any sequel form of Nalia. She is singular and eternal.
- Modifying Marcus's existing "injured dragon during a race" line. Additive only.

---

## System-Wide Impact

- **Matchup chart cross-effects.** Adding Mountain to the `matchups` object in `codex/script.js` does not automatically update other elements' strong-against and weak-against arrays. When Aza decides Mountain's matchups, those reciprocals will need editing across the other element entries. U2 leaves a grouped TODO note to surface this when the time comes.
- **Element badges.** Any UI that renders an element badge by element name will need the `--mountain` color path. U2 covers the CSS var and Chapter II button; U3 covers the legend card badge. If there is a future element-listing page or chart not currently used, the Mountain entry there is implicit but not actively built in this plan.
- **Chapter renumbering.** Renumbering Secrets from IX to X may touch any prose that references "Chapter IX" by name. U3 audits for stale references in `codex/index.html`. The `DRACO_Game_Bible.md` may also reference chapter numbers; U1 should sweep for "Chapter IX" prose. The `Secrets` anchor itself is `#secrets`, so anchor links do not change.
- **AI game state.** No save-state schema changes. Existing `players[].dragons[]` shape accepts a Nalia entry the same as any other dragon. The taming exclusion rule lives in the narrator's system prompt, not in code.
- **PROJECT_STATUS.md.** Session updates at end of implementation. Lead session only per `project-status-safety` rule.

---

## Risks and Mitigations

- **Risk: Empty Mountain matchup arrays break the matchup chart visually.**
  Mitigation: U2 ships an honest "Aza-pending" message in the matchup-result area instead of a broken or empty state. Tested in U2 verification.

- **Risk: Chapter renumbering breaks navigation or scroll behavior.**
  Mitigation: U3 sweeps the file for "Chapter IX" references and verifies the `#secrets` anchor link still resolves. Manual nav check in U3 verification.

- **Risk: AI narrator invents baby Nalia encounters despite the constraint.**
  Mitigation: U5 ships an explicit narrator rule with in-fiction handling guidance. U5 verification includes an explicit "try to find baby Nalia" probe.

- **Risk: Image prompts for "snow becoming wings" produce inconsistent or off-style results.**
  Mitigation: Prompts are run by Brent outside the conversation; he can regenerate freely. U6 stages, does not commit to a single shot. Multiple attempts are expected and cheap (about four cents each per CLAUDE.md).

- **Risk: Dragon Masters contamination during write-up.**
  Mitigation: Every implementation unit's verification scenario includes a grep on "Dragon Masters" and "Griffith" returning zero results. If a future Aza term sounds Dragon-Masters-adjacent, escalate to Aza before adopting.

- **Risk: Marcus's existing "injured dragon" line is accidentally edited or removed.**
  Mitigation: U1 and U4 explicitly mandate additive paragraphs only. Diff review checks that the original sentence is present verbatim. Use the Edit tool's exact-match behavior for safety.

- **Risk: Em dash leakage in new prose.**
  Mitigation: Every unit's verification includes a grep for the em dash character (Unicode U+2014) returning zero results in the diff. Brent's standing rule is absolute.

- **Risk: Scope creep into retroactive legend promotions.**
  Mitigation: Scope Boundaries calls this out explicitly. Implementer rejects any pull to "while you are here, mark Draco as a legend too."

---

## Open Decisions

Three remain at the time of writing. All are Aza calls. None block plan execution; each is staged as a labeled TODO inside the relevant unit.

1. **Mountain element matchups.** What is Mountain strong against and weak against? Brent to ask Aza with a short menu of candidate pairings.
2. **Chapter placement confirmation.** Default in this plan: Legends inserts as new Chapter IX, Secrets shifts to X. Brent confirms with Aza.
3. **Mountain element hex color.** Default in this plan: a placeholder slate-ochre tone. Brent and Aza pick the final hex.

Implementation may proceed without resolving these; each lands as an Aza-pending TODO with a clear grep target.

---

## Verification (whole-plan)

The plan is complete when:

- All six units pass their per-unit manual verification scenarios.
- The Codex builds and loads in a local browser with no console errors. Every chapter still navigates correctly. The Legends chapter is reachable from the nav and contains a Nalia legend card.
- The AI game adventure flow passes the narrator probes in U5 verification.
- Three Aza-pending TODOs (matchups, placement confirmation, color hex) are findable via a single grep on `TODO: Aza` across the modified files.
- `DRACO_Game_Bible.md` reads as Aza's canonical world. Aza, on review, says "yes, this is right."
- `PROJECT_STATUS.md` has been updated with this session's work (lead session only).
- Footer reports v1.7.
- No em dashes anywhere in the diff. No "Dragon Masters" or "Griffith" anywhere in the diff.

---

## Related

- Origin requirements: `docs/brainstorms/nalia-legends-requirements.md`
- Lore Q&A source: `docs/aza-answers-nalia.md`
- Lore Q&A questions: `docs/aza-questions-nalia.md`
- Audio source: `the-nalia.m4a` (Aza voice memo, 2026-05-23)
- Transcript: `.raw/audio-transcripts/2026-05-23-0842-the-nalia.txt` (in wiki vault, outside repo)
- Project architecture: `CLAUDE.md`
- Session status: `PROJECT_STATUS.md`
