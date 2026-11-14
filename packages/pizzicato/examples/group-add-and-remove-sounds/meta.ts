// Pizzicato.js example: building a chord in a Group note by note
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Add and remove sounds in a group',
  summary:
    'A chord is built one note at a time: addSound() puts each note into the group, and group.stop() silences the whole chord at once. A note taken out with removeSound() is no longer the group’s, so group.stop() misses it.',
  section: 'Grouping sounds',
  tags: ['Group', 'addSound', 'removeSound', 'stop'],
  docs: ['repo/README.md', 'repo/src/Group.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
