// tone-js example: Sound that drifts left and right
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sound that drifts left and right",
  summary:
    "Tone.AutoPanner moves a sound between the left and right speakers with an LFO. Watch the two traces swap loudness as a chord pans back and forth.",
  section: 'Effects',
  tags: ['AutoPanner', 'start', 'frequency', 'depth'],
  docs: ['repo/Tone/effect/AutoPanner.ts', 'repo/Tone/effect/LFOEffect.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
