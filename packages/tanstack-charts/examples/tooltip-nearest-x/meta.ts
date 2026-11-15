// tanstack-charts example: nearest-x ignores vertical distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'nearest-x ignores vertical distance',
  summary:
    'With focus nearest-x the pointer picks the point whose x is closest, however far above or below it sits. A scatter makes the difference plain: the tooltip follows the pointer left and right and never goes dark.',
  section: 'Tooltips and Focus',
  tags: ['focus', 'nearest-x', 'maxFocusDistance', 'tooltip'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
