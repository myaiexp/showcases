// tanstack-charts example: nearest-y ignores horizontal distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'nearest-y ignores horizontal distance',
  summary:
    'The mirror of nearest-x: focus follows the pointer up and down and picks the point at the closest height, wherever it sits horizontally. Useful for charts read across rows.',
  section: 'Tooltips and Focus',
  tags: ['focus', 'nearest-y', 'maxFocusDistance', 'tooltip'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
