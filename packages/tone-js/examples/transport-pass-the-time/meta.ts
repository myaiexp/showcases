// Tone.js example: Always pass the time to the sound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Always pass the time to the sound',
  summary:
    'Transport callbacks run slightly before their moment and receive the exact time to schedule at. Pass it on and the beat is steady; leave it off and notes land loose. In the full view toggle it and freeze the page to hear the difference; in the silent card, the ignored notes all pile up at the start.',
  section: 'Transport',
  tags: ['scheduleRepeat', 'triggerAttackRelease', 'time', 'loop'],
  docs: [
    'repo/Accurate-Timing.md',
    'repo/Transport.md',
    'repo/Tone/core/clock/Transport.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
