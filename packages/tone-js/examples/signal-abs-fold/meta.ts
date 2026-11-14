// Tone.js example: Fold a wobble with Abs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fold a wobble with Abs',
  summary:
    'Abs flips the negative half of a wave upward, so a pitch wobble that used to rise and fall once per cycle now bounces off its floor twice. Compare the plain wave and the folded one.',
  section: 'Signals',
  tags: ['Abs', 'LFO', 'Multiply', 'Add'],
  docs: ['repo/Signals.md', 'repo/Tone/signal/Signal.ts', 'repo/Tone/signal/Abs.ts', 'repo/Tone/signal/Multiply.ts', 'repo/Tone/signal/Add.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
