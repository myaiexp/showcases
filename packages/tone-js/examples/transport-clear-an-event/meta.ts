// Tone.js example: Switch a repeating sound off with its id
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Switch a repeating sound off with its id',
  summary:
    'Every Transport.schedule call returns an id, and clear(id) cancels just that event. A kick, a hat and a ping repeat together; in the card the hat is cleared at bar 2, and in the full view each box switches its part off and on.',
  section: 'Transport',
  tags: ['scheduleRepeat', 'clear', 'nextSubdivision', 'MembraneSynth', 'NoiseSynth'],
  docs: [
    'repo/Transport.md',
    'repo/Tone/core/clock/Transport.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
