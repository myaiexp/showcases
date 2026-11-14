// tone-js example: Blend an effect with the clean sound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Blend an effect with the clean sound",
  summary:
    "Every effect has a wet control, from 0 (only the clean sound) to 1 (only the effect). Here a Tone.Distortion is blended into a drum loop in steps.",
  section: 'Effects',
  tags: ['wet', 'Distortion', 'Effect'],
  docs: ['repo/Effects.md', 'repo/Tone/effect/Effect.ts', 'repo/Tone/effect/Distortion.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
