---
date: 2026-06-01
topic: faster-narrator-voice
---

# Faster Narrator Voice (Sentence-by-Sentence Playback)

## Summary

Make the Draco narrator start speaking about a second after a reply appears, instead of waiting for the entire reply to be turned into audio. Split the narrator's text into sentences, speak the first one right away, and fetch the next sentence while the current one plays so playback stays gapless. Reuse the existing, working voice playback exactly, and add no streaming technology.

---

## Problem Frame

The narrator voice works reliably but is slow to start. Today the full reply text lands in the chat window, then the whole thing is sent for text-to-speech, and the game waits for the complete audio clip before any sound plays. The narrator's replies are often long (15-plus lines), so the silence before the first word can run several seconds. For a 7-year-old mid-adventure, that pause kills momentum.

An earlier attempt streamed the audio as it generated (MediaSource). It was shelved because it risked going silent on iPad and iPhone, the devices Aza actually plays on, and the speed benefit was unverified. That work is saved on the `wip/tts-streaming` branch. This approach takes the opposite bet: change nothing about how audio is played, only how the text is chunked before it reaches the proven playback path.

---

## Key Decisions

- **Chunk at the `speak()` boundary, not in each caller.** The splitting and sequencing live inside the voice entry point in `codex/game.js`, so every place that triggers narration (story responses, the intro line) gets the speed-up with no other changes.
- **Read one sentence ahead, not all at once.** While a sentence plays, fetch the next one. Do not request every sentence in parallel. One-ahead keeps playback smooth without flooding the API or risking sentences arriving out of order.
- **Reuse the existing playback path; add no streaming tech.** Each sentence is fetched and played the same way a full clip is today (fetch the audio, decode, play, with the current fallbacks). No MediaSource or other new audio machinery. This is what keeps iPad and iPhone behavior unchanged except for speed.
- **Any failure falls back to today's behavior.** If splitting, fetching, or playing a sentence fails, abandon the sentence-by-sentence path for that reply and play it the existing whole-clip way. The floor is exactly today's experience, never worse.
- **Keep the existing interruption guard and length cap.** The generation counter that prevents two voices overlapping, `stopSpeaking()`, and the current character cap stay in place. Sentence playback runs inside that guard so a new turn cleanly cancels an in-progress sequence.

---

## Requirements

**Playback behavior**
- R1. When the narrator produces a reply, the first sentence begins playing as soon as its audio is ready, without waiting for the rest of the reply.
- R2. Remaining sentences play in their original order, each following the previous one with no audible gap under normal conditions.
- R3. While a sentence is playing, the next sentence's audio is fetched in advance (one sentence ahead).
- R4. The full reply is spoken in the same words and the same voice as today. Chunking changes timing only, not content.

**Interruption and lifecycle**
- R5. Starting a new narration (a new turn) stops any in-progress sentence sequence immediately, with no leftover or overlapping audio from the previous reply.
- R6. The sentence sequence cleans up after itself when it finishes or is interrupted, leaving no audio objects or buffers running.

**Reliability and fallback**
- R7. If any sentence fails to fetch, decode, or play, the reply falls back to playing as a single clip through the existing method, so the result is never worse than today.
- R8. A reply that is a single sentence, or too short to split, plays exactly as it does today through the existing path.

**Platform**
- R9. Behavior on iPad and iPhone is unchanged except for speed. No new audio-permission or autoplay requirement is introduced beyond what the current voice already relies on.

---

## Key Flows

- F1. Normal multi-sentence reply
  - **Trigger:** Narrator reply text is complete in the chat window and narration starts.
  - **Steps:** Split text into sentences. Fetch sentence 1. Play sentence 1 and begin fetching sentence 2. When sentence 1 ends, play sentence 2 (already fetched) and fetch sentence 3. Continue until the last sentence finishes.
  - **Outcome:** First words within about a second, gapless playback through the end.
  - **Covers:** R1, R2, R3, R4

- F2. Player starts a new turn mid-narration
  - **Trigger:** A new narration begins while a sentence sequence is still playing.
  - **Steps:** The interruption guard invalidates the in-flight sequence. Current audio stops, any pending fetch is dropped, resources are released. The new narration starts its own sequence.
  - **Outcome:** Only the newest narration is heard, with no overlap.
  - **Covers:** R5, R6

- F3. A sentence fails
  - **Trigger:** A sentence cannot be fetched, decoded, or played.
  - **Steps:** Stop the sentence-by-sentence attempt for this reply. Play the whole reply as one clip through the existing path and its current fallbacks.
  - **Outcome:** The reply is still spoken. Result is no worse than today.
  - **Covers:** R7

---

## Acceptance Examples

- AE1. **Covers R1, R3.** Given a 10-sentence reply, when narration starts, then the first sentence is audible within about a second and the second sentence has been fetched before the first finishes.
- AE2. **Covers R2.** Given consecutive sentences, when one ends, then the next begins with no noticeable silence between them.
- AE3. **Covers R5, R6.** Given a sentence sequence is playing, when the player sends a new message that triggers new narration, then the old sequence stops at once with no overlapping voice and nothing left running in the background.
- AE4. **Covers R7.** Given the third sentence's audio request fails, when that failure occurs, then the reply is re-spoken as a single clip and the player still hears the whole thing.
- AE5. **Covers R8.** Given a one-sentence reply, when narration starts, then it plays through the existing path with no change from today.

---

## Scope Boundaries

**Deferred for later**
- Starting the voice while the AI is still writing the reply (speaking sentence 1 before the full text lands). Higher upside, but it touches the working chat-stream path, so not now.
- Reviving the shelved MediaSource streaming approach on the `wip/tts-streaming` branch.

**Separate, complementary effort**
- Making the narrator say less (`docs/narrator-brevity-plan.md`). Shorter replies also reduce the wait, but that is its own change and not part of this.

**Not changing**
- The voice, the TTS model, the wording of narration, or the existing character cap.

---

## Dependencies / Assumptions

- **iPad autoplay assumption (verify on Aza's device).** This relies on each sentence playing through the same audio that is already unlocked when the voice auto-plays today. The assumption is that playing sentence 2, 3, and so on (triggered by the previous sentence ending, not by a tap) works the same as today's auto-play. This is the one thing to confirm on the actual device before trusting the feature.
- The narrator's full reply text is available before narration starts (current behavior).
- The voice server (`api/speak.js`) keeps returning a full audio clip per request. Each sentence is one request.

---

## Success Criteria

- First words begin within about a second of a reply appearing, versus the current multi-second wait on long replies.
- No audible gaps between sentences under normal network conditions.
- On any failure, the experience is identical to today (the floor holds).
- Confirmed working on the iPad or iPhone Aza actually uses before it is considered done.

---

## Outstanding Questions

**Resolve before shipping**
- Confirm on Aza's actual device that sequential sentence playback auto-plays without a new tap (the iPad autoplay assumption above). If it does not hold, the feature stays behind the existing fallback.

**Deferred to planning**
- Exact sentence-splitting rules: handling abbreviations, dialogue, sound-effect lines (for example WHOOSH), and very short fragments, plus how aggressively to merge tiny fragments into a neighboring clip.
