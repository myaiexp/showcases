// tanstack-charts example: Keyed selection with whenSelected
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keyed selection with whenSelected',
  summary:
    'keyedSelection turns a click, Enter or Space on a point into a proposed key through a controlled signal. The application stores the accepted key and rebuilds the definition, and whenSelected paints a larger ring only on the selected dot. Focus and selection are independent.',
  section: 'Interactions and Selections',
  tags: ['keyedSelection', 'whenSelected', 'controlledSignal', 'selection'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
