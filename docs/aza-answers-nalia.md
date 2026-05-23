# Aza's Answers — Nalia and Draco Legends

Companion to `aza-questions-nalia.md`. Source of truth for the requirements doc. Reviewed and corrected by Aza on 2026-05-23.

---

## CRITICAL CANON GUARDRAILS (Aza-stated)

- **Aza alone decides canon.** Not Brent, not Claude. Aza, on the record: "If the world has a god, that god's name is Aza." When ambiguity arises, the answer is to ask Aza, never to guess.
- **Draco is its OWN universe.** Do not borrow names, characters, mechanics, or terminology from **Dragon Masters** (the existing children's book series). Aza is explicit: "we don't want to steal from it." The earlier transcript guess of "Griffith" was Aza accidentally crossing wires with Dragon Masters. Discard it entirely.
- **Draco himself is NOT a legendary dragon.** He is the **namesake** (the game is named after him), but he is not in the Legends chapter.
- **Power Up is NOT a legend.** "Just a normal Power dragon."
- **Launch the Legends chapter with Nalia only.** Future legends are "we should make up together." Placeholders, not retroactive promotions of existing dragons.

---

## 1. Pronunciation
**NAH-lee-yah**

## 2. Gender
**She.**

## 3. Baby Nalia (CORRECTED from original triangle description)
- **Size:** about as big as a **loaf of bread**.
- **Shape:** a **cylinder body** with two wings, two tiny claws, two tiny paws at the bottom, and two very cute eyes.
- **Color:** **blue**.
- **Accessories:** wearing **a bunch of medals** from the contests she won.
- **Drawing:** Aza will draw her on white paper and photograph it. He also has a **cardboard cutout** of baby Nalia. The drawing/cutout is the source-of-truth visual; image generation must wait on it.

## 4. Mountain Nalia
- **Eyes:** closed when sleeping. "Calm closed eyes."
- **Back:** trees and a **forest** grow on her back. People grow plants there.
- **Top:** **snow on top.** Signature reveal: **the snow turns into her wings when she wakes up.** This is the hero visual for the wake cycle.
- **Face:** visible enough to recognize, but she primarily reads as a mountain while sleeping.
- **Cardboard cutout:** Aza has a cutout of sleeping Mountain Nalia as well. Brent can photograph it as reference if useful.

## 5. Element
**MOUNTAIN.** A brand-new element, just for Nalia (for now). Not Earth, not Stone. Mountain. New element in the system. Needs CSS color var, matchup chart entry, glossary entry, element badge, ELEMENT_COLORS update in game.js.

## 6. Tamer
**Marcus (The Finisher),** the existing ally character.
- He found Nalia when he was a kid.
- He raised her.
- When she was big enough, **Marcus released her into the world.** Their bond persists across her sleep cycles. She visits him during her wake year (see Q10).
- **Question of whether Nalia is "the injured dragon" from Marcus's existing backstory:** Aza explicitly skipped this. Not a worry. Treat the Nalia origin and the injured-dragon line as independent; do not retcon either.

## 7. Awards (tiny-Nalia era)
- **Dragon Racing:** roughly a thousand.
- **Cutest Dragon:** roughly a thousand.
- No other categories.
- "About a thousand" is hyperbolic. Aza confirms: "I said about a thousand, not actual a thousand." Render in copy as "hundreds upon hundreds" or "nearly a thousand."

## 8. Evolution trigger
**It just happened on its own.** Overnight. Marcus went to bed; in the morning Nalia was the size of a mountain and the bond was deeper. No dream, no visitor, no noise. Natural growth at the right moment.

## 9. Mountain-state lore (the 2-million-year sleep)
- **Caves inside her:** yes.
- **Buildings on her:** essentially no. People know she is a legendary dragon and treat her better than a normal mountain. They cultivate forests and plants instead of building.
- **One exception:** there is exactly one structure on her, an **animal shelter.** That's it.
- **Recognition:** people know she's a dragon. Respect for her shapes how they use her.

## 10. The 1-year wake cycle
- **What she does when awake:** helps other dragons, flies around, visits Marcus, fights bad guys.
- **Specific bad guys she fights:** The Voice Below (the "main, main villain") and Wonky Donkers (goofball recurring villain). The doubled "main, main villain" framing is Aza-endorsed flavor; preserve it in copy.
- **Eggs:** she does NOT lay eggs. Reason (newly canonized): **there is only one Nalia, and she practically lives forever.** Nalia is a **singular, eternal being.** No offspring, no clutch, no sequel.
- **Wake trigger:** not specified. Default to a natural cycle (2M asleep, 1 awake, repeats) unless Aza later names a trigger.

## 11. Game encounterability (AI adventure game)
- **Baby Nalia:** cannot be met. That era is closed; she is already raised.
- **Mountain Nalia:** CAN be found and tamed.
- **Taming exclusion rule (CORRECTED from earlier wording):** This is a **loadout** rule, not a **collection** rule.
  - A player CAN have tamed a legendary or Chromatic dragon previously and still find / tame Nalia later.
  - The restriction: while on the journey where the player is looking for Nalia, they cannot have a legendary dragon OR a Chromatic dragon **in their active party.**
  - In practice: leave the legendary / Chromatic dragons at home (or wherever the game stores idle dragons) to qualify for the Nalia journey.
- **Variant:** in the **Chromatic Fields** (existing location), a lucky player may find a **multicolored Nalia**, a Chromatic variant of the legendary mountain dragon.

## 12. Draco Legends architecture (FINAL)
- **Name in copy:** "Legend Codex" works as a phrase, but the implementation is a **new chapter inside the existing Codex.** Not a separate site, not a separate book.
- **Aza's reasoning for integration:** "Then it becomes a lot to keep up with." Keep everything under one roof.
- **Form factor:** its own brand-new chapter, with cards for each legend (similar in spirit to the existing dragon-card grid, but for legends).
- **Launch contents:** Nalia only.
- **Future legends:** placeholders. No retroactive promotions. Aza and Brent invent new legends together later.
- **Existing dragons that are NOT legends:** Draco (namesake only), Power Up (normal Power dragon).
- **No "Legend" badges on the existing dragon grid.** The Legends chapter stands on its own.

## 13. Other Nalia details
- **Diet (CORRECTED):** Nalia loves the fruit from the **Chromatic Fields.** That fruit IS NOT ginormous from her point of view. It is fruit-sized for a dragon her size, the way ordinary fruit is fruit-sized for a person. One bite does NOT fill her up. Aza-specified scale: she would need to eat **more than a million normal-sized fruit** to be satisfied. So Chromatic-Fields fruit is her practical food source because it scales for her.
- **Relationship dimension:** she can be either a team's best friend (group bond) or just one player's best friend (individual bond). Player-choice flavor, not a mechanical fork.

---

## Promised / pending artifacts
- **Drawing of baby Nalia** on white paper (Aza will produce; Brent photographs).
- **Optional photographs** of Aza's cardboard cutouts (baby Nalia, sleeping mountain Nalia) for reference during image generation.

---

## Outstanding product decisions (need Aza)

1. **Mountain element matchup chart:** what is Mountain strong against and weak against? Other elements in the system: Fire, Water, Grass, Electric, Psychic, Spirit, Speed, Thundercloud, Universe, Cosmic, Egg, Power, Shadow, Starlight. Recommend a short follow-up ask to Aza with a few candidate matchups he can react to.
2. **Multicolored (Chromatic) Nalia variant:** does she share Mountain element, gain a Chromatic element, or have her own variant typing? Visual approach: rainbow-banded mountain, or shifting-color forest on her back?
3. **Wake trigger:** does anything specific wake Nalia, or is the cycle just timed? Defaulting to timed unless Aza specifies.

---

## Engineering-relevant deltas (preview, full plan in requirements doc)

1. **New element: Mountain.** CSS color var, glossary, matchup chart row + button, element badge, ELEMENT_COLORS update in `codex/game.js`.
2. **New chapter: Legends.** New section in `codex/index.html`, new card style for legend cards (more cinematic than dragon cards), nav entry, scroll-reveal animations, footer version bump.
3. **New dragon card: Nalia.** Two forms shown (baby loaf-of-bread blue cylinder with medals, mountain). Card lives in the Legends chapter, not the main dragon grid.
4. **Marcus backstory extension.** Character card and glossary entry get a Nalia paragraph (raised her, released her, she visits him during wake year). Existing "injured dragon" line stays untouched.
5. **New image prompts** in `codex/generate-images.js`:
   - Baby Nalia (wait for Aza's drawing).
   - Mountain Nalia sleeping (forest on back, snow cap, animal shelter visible somewhere, no other buildings).
   - Mountain Nalia waking (snow becoming wings; signature shot).
   - Optional: multicolored / Chromatic Nalia.
6. **`codex/game.js` system prompt additions:** Nalia lore in GAME_BIBLE, the loadout-exclusion taming rule in mechanics, Mountain element in ELEMENT_COLORS, Marcus's enriched backstory, eternal-singular-Nalia constraint.
7. **Glossary entries (minimum):** Nalia, Mountain (element), Legend Codex (or "Legends chapter"), Marcus + Nalia, Chromatic Nalia variant, animal shelter on Nalia (optional).
8. **Game Bible (`DRACO_Game_Bible.md`) updates:** new Legends section, Nalia full lore entry, Mountain element addition to elements section, Marcus extension, version bump (currently v1.6, this is at least v1.7).
