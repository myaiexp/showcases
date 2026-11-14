// Tone.js example: Cut a ramp short
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cut a ramp short',
  summary:
    'Two ramps are planned, then changed your mind: cancelScheduledValues erases the second one, cancelAndHoldAtTime stops it midway and holds the value reached.',
  section: 'Signals',
  tags: ['Signal', 'cancelScheduledValues', 'cancelAndHoldAtTime', 'linearRampToValueAtTime'],
  docs: ['repo/Signals.md', 'repo/Tone/core/context/Param.ts', 'repo/Tone/signal/Signal.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
