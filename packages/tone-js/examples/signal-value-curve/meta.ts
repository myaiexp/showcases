// Tone.js example: Pitch drawn as a list of numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pitch drawn as a list of numbers',
  summary:
    'Hand a Signal an array and setValueCurveAtTime stretches it over a duration, so any shape you can list becomes a glide. Pick a shape and watch the pitch follow it.',
  section: 'Signals',
  tags: ['Signal', 'setValueCurveAtTime'],
  docs: ['repo/Signals.md', 'repo/Tone/core/context/Param.ts', 'repo/Tone/signal/Signal.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
