// Tone.js example: An alarm that rings once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An alarm that rings once',
  summary:
    'On a looping Transport, schedule fires its callback on every lap while scheduleOnce fires it a single time and then forgets it. The counter shows how many times the alarm rang over three laps.',
  section: 'Transport',
  tags: ['schedule', 'scheduleOnce', 'loop', 'clear'],
  docs: [
    'repo/Transport.md',
    'repo/Tone/core/clock/Transport.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
