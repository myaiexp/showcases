// tanstack-charts example: Duplicate keys select every match
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Duplicate keys select every match',
  summary:
    'The selection key does not have to be unique. Keying on the series name makes a click on any point select the whole series, and whenSelected paints every matching row, so one thick line and its dots appear.',
  section: 'Interactions and Selections',
  tags: ['keyedSelection', 'key', 'whenSelected', 'lineY', 'duplicate keys'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
