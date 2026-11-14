// Tone.js example: Same ramp, different curve by units
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Same ramp, different curve by units',
  summary:
    'rampTo chooses its own curve from what the signal measures: a Hz signal glides by octaves, a plain-number signal in a straight line. Pick which one drives the pitch and compare.',
  section: 'Signals',
  tags: ['Signal', 'rampTo', 'units', 'frequency'],
  docs: ['repo/Signals.md', 'repo/Tone/core/context/Param.ts', 'repo/Tone/signal/Signal.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
