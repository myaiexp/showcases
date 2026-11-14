// Tone.js example: Ramp that settles in
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ramp that settles in',
  summary:
    'rampTo arrives on the dot and stops; targetRampTo throws the pitch toward the new value and eases in, like a spring. Pick one for the sound of a change, not just its end.',
  section: 'Signals',
  tags: ['Signal', 'targetRampTo', 'rampTo'],
  docs: ['repo/Signals.md', 'repo/Tone/core/context/Param.ts', 'repo/Tone/signal/Signal.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
