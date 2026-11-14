// Tone.js example: Fire exactly four times
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fire exactly four times',
  summary:
    'A Tone.Loop calls back every interval, and its iterations option caps how many times it fires before it quietly stops. Each numbered dot is one call; try a quarter, eighth or sixteenth interval and raise the count.',
  section: 'Events',
  tags: ['Loop', 'interval', 'iterations', 'start'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/Loop.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
