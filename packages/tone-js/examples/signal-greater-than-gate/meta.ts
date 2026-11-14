// Tone.js example: Gate a tone with GreaterThan
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gate a tone with GreaterThan',
  summary:
    'GreaterThan outputs 1 while a wave is above a threshold and 0 otherwise, so a smooth wobble becomes an on/off gate. Raise the threshold and the tone gets choppier; GreaterThanZero is the threshold-at-zero version.',
  section: 'Signals',
  tags: ['GreaterThan', 'GreaterThanZero', 'LFO', 'Gain'],
  docs: ['repo/Signals.md', 'repo/Tone/signal/Signal.ts', 'repo/Tone/signal/GreaterThan.ts', 'repo/Tone/signal/GreaterThanZero.ts', 'repo/Tone/source/oscillator/LFO.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
