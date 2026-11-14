// Pizzicato.js example: taking effects off a Group again
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Take an effect off a group',
  summary:
    'A band plays through fuzz and then an echo. group.removeEffect() takes one out of the chain while the music keeps going, and the other effect stays connected.',
  section: 'Grouping sounds',
  tags: ['Group', 'removeEffect', 'addEffect', 'Distortion', 'Delay'],
  docs: ['repo/README.md', 'repo/src/Group.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
