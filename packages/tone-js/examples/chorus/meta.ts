// tone-js example: One sound that becomes several
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "One sound that becomes several",
  summary:
    "Tone.Chorus mixes in slightly detuned, wobbling copies, one per speaker, so a single synth sounds like a small ensemble. Push the feedback up and it turns into a flanger.",
  section: 'Effects',
  tags: ['Chorus', 'start', 'frequency', 'delayTime', 'depth', 'feedback', 'spread'],
  docs: ['repo/Tone/effect/Chorus.ts', 'repo/Tone/effect/StereoFeedbackEffect.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
