// Tone.js example: Play a melody on one signal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Play a melody on one signal',
  summary:
    'One frequency signal, no notes triggered: setValueAtTime jumps it to a new pitch at each scheduled moment, so a Signal sequences a tune by itself.',
  section: 'Signals',
  tags: ['Signal', 'setValueAtTime', 'frequency'],
  docs: ['repo/Signals.md', 'repo/Tone/core/context/Param.ts', 'repo/Tone/signal/Signal.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
