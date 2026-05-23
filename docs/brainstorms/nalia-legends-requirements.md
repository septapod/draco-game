# Requirements: Nalia and the Draco Legends Chapter

**Author:** Brent Dixon (with Aza Dixon as creative authority)
**Date:** 2026-05-23
**Status:** Requirements complete, ready for `/ce-plan`
**Source material:**
- Audio: `the-nalia.m4a` (Aza voice memo)
- Transcript: `.raw/audio-transcripts/2026-05-23-0842-the-nalia.txt` (in wiki vault)
- Lore Q&A: `docs/aza-questions-nalia.md`, `docs/aza-answers-nalia.md`

---

## 1. Problem

Aza created a new legendary dragon, **Nalia**, and asked for a new on-site system that catalogs all of Draco's legends. Today the Codex has 9 chapters and 15 dragon cards but no concept of a "legend tier." Nalia introduces a new dragon AND a new element (**Mountain**) AND a new mechanic (taming exclusion based on party loadout) AND a new visual hero moment (snow-cap becoming wings on awakening) AND extends an existing character's backstory (Marcus / The Finisher).

The work is to integrate all of that across the four production surfaces (Game Bible, Codex web, AI game, image pipeline) without breaking existing canon and without crowding the existing dragon grid with retroactive "legend" labels.

## 2. Creative authority

**Aza alone decides canon.** Brent documents and builds. Claude implements per Brent's direction. When Aza-stated lore conflicts with prior Game Bible content, Aza's word wins. Disambiguation is by asking Aza, not by Claude or Brent guessing.

## 3. Users and value

- **Aza (primary):** sees his new dragon and new system land in the real Codex and in the live AI game. Validates the "world has a god" claim by seeing his words become canon faithfully.
- **Brent (secondary):** documents and ships Aza's vision without inventing product behavior.
- **Other players** (kids who play the live game): gain a new legendary dragon to discover, a new element to learn, and a new Legends chapter to read.

## 4. Success criteria

Ship-ready when:

1. Nalia exists in `DRACO_Game_Bible.md` with all 13 answer dimensions reflected (size, shape, color, gender, element, tamer, awards, evolution, mountain-state, wake cycle, encounterability, variants, diet).
2. A new **Legends chapter** lives in `codex/index.html` and renders a card for Nalia. The chapter has its own nav entry and visual treatment distinct from the existing dragon grid.
3. **Mountain** is a first-class element: appears in the matchup chart, has a CSS color var, has glossary entries, and is referenced by Nalia's card.
4. **Marcus's character entry** is extended with the Nalia backstory (raised her as a kid, released her at full size, she visits during her wake year). The pre-existing "injured dragon" line is preserved untouched.
5. The AI game's system prompt (`codex/game.js`) knows about Nalia, Mountain element, the **loadout-based taming exclusion rule**, the eternal-singular nature of Nalia, the multicolored Chromatic variant, and Marcus's enriched backstory.
6. Image pipeline has prompts staged for: mountain Nalia sleeping, mountain Nalia waking (snow becoming wings), optional Chromatic variant. Baby Nalia waits on Aza's hand-drawn reference.
7. Codex footer version bumped (currently v1.6; this work is v1.7 or higher).
8. PROJECT_STATUS.md updated.

## 5. In scope

- New chapter X "Draco Legends" in the Codex with one legend card (Nalia).
- New element **Mountain** across Game Bible, glossary, matchup chart, element badge styling, and `ELEMENT_COLORS`.
- Nalia full lore in Game Bible (own subsection within Legends section).
- Marcus character card and glossary entry extended with the Nalia origin paragraph.
- Game.js system-prompt additions for Nalia lore, Mountain element, taming exclusion rule, Marcus extension.
- New image prompts in `generate-images.js` for the mountain forms. Image generation runs only after prompts are merged.
- Footer + version bump.

## 6. Out of scope

- **Retroactive promotion** of existing dragons (Draco, Power Up, Aloha, etc.) into the Legends chapter. Aza was emphatic: launch with Nalia only.
- **"Legend" badges** on the existing dragon grid.
- **New legends besides Nalia** at this milestone. Future legends are "we make them up together" later, with Aza.
- **Baby-Nalia image generation.** Waits on Aza's hand drawing. Card and Bible can reference the baby form in copy without an image until then.
- **New encounter mechanics in the AI game beyond text-level lore.** The taming exclusion rule lives in the system prompt so the narrator can apply it; we are not building combat logic, party-management UI, or a save-state field for it.
- **Borrowing anything from Dragon Masters.** Hard prohibition. Including names, character archetypes, plot beats, mechanics, or terminology.
- **Resolving whether Nalia is "the injured dragon" Marcus helped in his existing backstory.** Aza skipped it. Treat both lore beats as independent for now.

## 7. Canonical Nalia (the lore decisions to capture)

| Dimension | Decision |
| --- | --- |
| Name pronunciation | NAH-lee-yah |
| Gender | She |
| Element | Mountain (new) |
| Tamer | Marcus (The Finisher), existing ally |
| Baby form | Loaf-of-bread sized, blue cylinder body, two wings, two tiny claws, two tiny paws, two cute eyes, bunch of medals |
| Mountain form | Mountain-sized; calm closed eyes; forest on her back; snow cap; one animal shelter on her; otherwise no buildings |
| Hero visual | Snow turns into wings when she wakes |
| Caves | Yes, inside her |
| Awards (baby era) | "Hundreds upon hundreds" in Dragon Racing AND Cutest Dragon |
| Evolution trigger | Natural overnight growth, no external cause |
| Sleep cycle | 2,000,000 years asleep, 1 year awake, repeats |
| Wake-year activities | Helps other dragons, flies, visits Marcus, fights The Voice Below and Wonky Donkers |
| Reproduction | None. Singular and eternal. There is only one Nalia |
| Diet | Chromatic Fields fruit (scaled for her size); over a million normal fruit equivalent to fill her |
| Bond type | Either team's best friend OR one player's best friend (flavor choice, not mechanic) |
| Encounter (baby) | Cannot be met; era is closed |
| Encounter (mountain) | Findable and tamable, subject to loadout exclusion |
| Loadout exclusion | Player cannot bring a legendary dragon OR a Chromatic dragon in their active party while seeking Nalia. Owning them in storage is fine |
| Chromatic variant | Multicolored Nalia, found only in Chromatic Fields, requires luck |

## 8. Draco Legends chapter design (product-level)

- **Placement:** new chapter inside the existing Codex. Aza explicitly rejected a separate codex/site. Sequence: most likely as the new final pre-Secrets chapter, or directly after Journey. Brent to confirm placement with Aza.
- **Visual treatment:** distinct from the dragon grid. Legend cards should feel more cinematic (larger, more vertical, more lore-forward) so a legend doesn't read as "just another dragon." Specific design direction is in scope for `/ce-plan`.
- **Launch contents:** one card, Nalia.
- **Growth pattern:** designed to accept future legend cards without restructure. Each future legend is added as a card by Aza + Brent + Claude together.
- **No cross-references in the dragon grid.** The existing 15 dragon cards do not gain "legend" markers. The Legends chapter is the sole home for legend identity.
- **Naming in copy:** "Draco Legends" as the chapter title; "Legend Codex" usable as in-world flavor in body copy.

## 9. Mountain element design (product-level)

- **Identity:** literally about mountains. Stone-like, monumental, ancient, slow.
- **Color var:** new CSS `--mountain` color. Brent / Aza pick the hex. Earth-tone candidates (slate gray, granite, deep ochre) feel right; final pick deferred to Brent + Aza.
- **Element-list parity:** appears anywhere existing elements appear (matchup chart buttons, badge styling, element list in glossary, `ELEMENT_COLORS` in game.js).
- **Matchups: open.** What is Mountain strong / weak against? Needs an Aza decision (see open product decisions below). Recommend a follow-up question sheet with 3 to 5 candidate matchups he can react to.

## 10. AI game integration

The AI game (`codex/game.html` + `codex/game.js`) currently builds its system prompt from a condensed Game Bible plus current state plus narrative summary. Additions needed:

- **GAME_BIBLE** gets the Nalia entry, the Mountain element entry, the Marcus backstory extension, and a note about the Chromatic Nalia variant.
- **HIDDEN_LORE** or equivalent rule block gets the loadout-based taming exclusion rule so the narrator enforces it organically. Phrasing should leave the narrator latitude to surface this in-fiction (an NPC warning, a magical barrier, a feeling Nalia gives the player) rather than as a pop-up rule statement.
- The eternal-singular nature of Nalia is a narrator constraint: never invent baby Nalia encounters, never invent another Nalia, never have Nalia lay eggs or produce offspring.
- The Voice Below and Wonky Donkers as recurring antagonists during Nalia's wake year give the narrator a hook for crossover encounters when Nalia is awake.
- No save-state schema changes. The existing `players[].dragons[]` shape can hold a Nalia entry the same as any other dragon.

## 11. Image pipeline plan

- **`generate-images.js`** gains prompts for:
  1. Mountain Nalia sleeping (forest on back, snow cap, animal shelter tucked somewhere on her, no other buildings, closed eyes).
  2. Mountain Nalia waking (snow cap dissolving into wings; eyes open; signature hero shot).
  3. Optional: Chromatic Nalia (rainbow-banded mountain or shifting color forest, deferred until #1 and #2 ship).
- **Baby Nalia image generation** waits on Aza's hand-drawn reference. The blue-cylinder-with-medals description is generation-feasible without it, but Aza's drawing is canonical, so wait.
- **Brent's image rules apply:** image gen runs Gemini + OpenAI side by side, Gemini variants rejected for newsletter use but acceptable here, generate offline via the existing script, never paste images into the conversation.

## 12. Dependencies and assumptions

- Aza will produce the baby Nalia drawing on white paper. Brent will photograph it. Until that exists, baby-form image generation is blocked.
- Marcus's existing character card and glossary entry remain unchanged in their existing copy; the Nalia paragraph is additive. If a conflict surfaces during write-up, default to additive and ask Aza.
- The Codex deploys via Vercel as a static site. No build-step changes are anticipated.
- Anthropic API and OpenAI Whisper integrations remain unchanged. No new env vars.
- The Codex's existing card and chapter patterns can host the Legends chapter with CSS extensions, not a rebuild. Confirmed during repo scan.

## 13. Open product decisions

These need answers before or during `/ce-plan`. Ranked by impact:

1. **Mountain element matchup chart.** What is Mountain strong against and weak against? Aza needs to decide. Recommend asking him as the next step.
2. **Chapter placement.** Where in the existing 9-chapter sequence does Legends land? Most natural: after Chapter VIII (Journey), before Chapter IX (Secrets). Brent confirms with Aza.
3. **Chromatic Nalia variant typing.** Does she still have Mountain element with a chromatic appearance, or does she gain a Chromatic element on top? Deferred but worth a quick Aza ping before image prompts.
4. **Wake trigger.** Currently defaulting to "natural cycle." Aza could canonize a trigger (Marcus's voice, a star alignment, etc.). Optional.
5. **Mountain element CSS color.** Brent + Aza pick a hex.
6. **Animal shelter detail.** Visible in the Codex card image, or only mentioned in lore? Aza preference.

## 14. Risks

- **Scope drift via "future legends."** Aza named placeholders. If we accidentally promote existing dragons into the Legends chapter at build time, we violate his canon. Guardrail: only Nalia goes in the chapter at this milestone, period.
- **Element-matchup chart breakage.** Adding a new element row touches every other element's strong/weak arrays. If matchups aren't authored carefully, existing fights in the AI game may shift. Mitigation: keep Mountain conservative (one strong, one weak) at launch; expand later.
- **Marcus retcon.** Risk of contradicting the existing "injured dragon" backstory line. Mitigation: keep it additive, do not edit existing prose.
- **Image-generation cost / quality on the cinematic mountain shots.** The snow-becoming-wings shot is ambitious. Plan for a regenerate-and-pick workflow; budget multiple attempts.
- **Dragon Masters contamination.** Risk that Claude or Brent unconsciously borrows from Dragon Masters when filling lore gaps. Mitigation: every named NPC, mechanic, or location not already in Draco canon goes back to Aza for confirmation.

## 15. Handoff

Next step is `/ce-plan` to translate this into concrete file changes, ordering, and an execution plan. Before running `/ce-plan`, recommend resolving open decisions 1 and 2 with Aza (Mountain matchups + chapter placement), since they shape the plan's structure.
