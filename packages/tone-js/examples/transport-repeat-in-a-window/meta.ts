// Tone.js example: Repeat for a while, then stop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Repeat for a while, then stop',
  summary:
    'Transport.scheduleRepeat fires a callback at an interval starting at a chosen position, and an optional duration ends the run by itself. The shaded span is the window: one bar, two beats, or no end at all. Pick the window in the full view.',
  section: 'Transport',
  tags: ['scheduleRepeat', 'interval', 'duration', 'startTime', 'Synth'],
  docs: [
    'repo/Transport.md',
    'repo/Tone/core/clock/Transport.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
