// Tone.js example: Wobble range from min to max
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Wobble range from min to max',
  summary:
    'An LFO swings between the min and max you give it. Narrow it for a gentle vibrato, widen it for a siren; the plot shows the exact range it sweeps.',
  section: 'Signals',
  tags: ['LFO', 'min', 'max'],
  docs: ['repo/Signals.md', 'repo/Tone/source/oscillator/LFO.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
