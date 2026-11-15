// tanstack-charts example: A nullish key makes a point non-selectable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A nullish key makes a point non-selectable',
  summary:
    'When the key callback returns null or undefined for a point, activating it does nothing. Here the hollow dots are locked and ignore clicks, while the filled ones can be selected.',
  section: 'Interactions and Selections',
  tags: ['keyedSelection', 'key', 'whenSelected', 'non-selectable'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
