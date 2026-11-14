// Tone.js example: Wobble a filter with an LFO
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Wobble a filter with an LFO',
  summary:
    'A low-frequency oscillator is connected straight into a filter cutoff, so a buzzy sawtooth opens and closes in a steady wah. Any LFO can steer any parameter this way.',
  section: 'Signals',
  tags: ['LFO', 'connect', 'Filter', 'frequency'],
  docs: ['repo/Signals.md', 'repo/Tone/source/oscillator/LFO.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
