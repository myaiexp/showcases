// tanstack-charts example: Replacing the focus ring with a crosshair marker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Replacing the focus ring with a crosshair marker',
  summary:
    'The built-in primary-point ring composes with authored focus geometry. Set focusRing to false only when something else deliberately replaces it, like the crosshair marker here, which is bigger and filled. Toggle the box to compare both.',
  section: 'Focus and Interaction',
  tags: ['focusRing', 'crosshair', 'marker'],
  docs: ['repo/docs/reference/focus-and-interaction.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
