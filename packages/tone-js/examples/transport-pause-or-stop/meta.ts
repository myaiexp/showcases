// Tone.js example: Pause keeps your place, stop starts over
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pause keeps your place, stop starts over',
  summary:
    'Transport.pause freezes the timeline and start() carries on from the same spot; Transport.stop rewinds it to the beginning. The same phrase is halted at 1.5 seconds and started again at 2.5, once with each.',
  section: 'Transport',
  tags: ['pause', 'stop', 'start', 'Part'],
  docs: [
    'repo/Transport.md',
    'repo/Tone/core/clock/Transport.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
