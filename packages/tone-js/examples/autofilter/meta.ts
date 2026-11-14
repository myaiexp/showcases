// tone-js example: Filter that opens and closes by itself
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filter that opens and closes by itself",
  summary:
    "Tone.AutoFilter sweeps a filter up and down with a built-in LFO, so a plain sawtooth riff gets a talking, pulsing wah. Call start() or the sweep never begins.",
  section: 'Effects',
  tags: ['AutoFilter', 'start', 'frequency', 'octaves', 'baseFrequency', 'wet'],
  docs: ['repo/Tone/effect/AutoFilter.ts', 'repo/Tone/effect/LFOEffect.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
