// Tone.js example: One note that repeats, then stops
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One note that repeats, then stops',
  summary:
    'A Tone.ToneEvent wraps a callback and a value. Turn loop on, set loopEnd to the repeat length, and give it a stop position, and it repeats until the Transport reaches that point. Change loopEnd to speed the repeat up or slow it down.',
  section: 'Events',
  tags: ['ToneEvent', 'loop', 'loopEnd', 'start', 'stop'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/ToneEvent.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
