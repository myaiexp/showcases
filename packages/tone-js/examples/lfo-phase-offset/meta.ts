// Tone.js example: Start the wobble elsewhere in its cycle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Start the wobble elsewhere in its cycle',
  summary:
    'LFO phase sets where in the cycle it begins. Four phases of the same sine start the pitch in the middle, at the bottom, and at the top.',
  section: 'Signals',
  tags: ['LFO', 'phase'],
  docs: ['repo/Signals.md', 'repo/Tone/source/oscillator/LFO.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
