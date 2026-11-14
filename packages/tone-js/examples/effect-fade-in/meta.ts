// tone-js example: Fade an effect in over time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fade an effect in over time",
  summary:
    "Calling wet.rampTo on an effect slides it from clean to fully effected. A decaying chord turns steadily into sustained fuzz through Tone.Distortion.",
  section: 'Effects',
  tags: ['wet', 'rampTo', 'setValueAtTime', 'Distortion'],
  docs: ['repo/Effects.md', 'repo/Tone/effect/Effect.ts', 'repo/Tone/effect/Distortion.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
