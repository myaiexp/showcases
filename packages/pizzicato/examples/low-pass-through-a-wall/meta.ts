// Pizzicato.js example: LowPassFilter making music sound like it plays in the next room
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Music through a wall',
  summary:
    "The party next door: with the door open you hear every drum, shut it and only the thump gets through. A LowPassFilter lets low frequencies pass and mutes the highs above its `frequency`; the card closes and opens the door by moving that number.",
  section: 'Effects',
  tags: ['LowPassFilter', 'frequency', 'peak'],
  docs: ['repo/README.md', 'repo/src/Effects/Filters.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
