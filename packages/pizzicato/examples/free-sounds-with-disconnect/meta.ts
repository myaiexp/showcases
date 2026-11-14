// Pizzicato.js example: many short sounds, each disconnected when it is done
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free sounds with disconnect',
  summary:
    'A burst of short blips, each one a new Pizzicato.Sound. Calling disconnect() on a blip once it has finished lets the browser free it, so the number of live sounds stays small. Leave it out and every blip stays wired in.',
  section: 'Advanced',
  tags: ['disconnect', 'memory', 'Sound', 'stop'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
