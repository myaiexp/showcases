// tanstack-charts example: Keyboard order follows the focus strategy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keyboard order follows the focus strategy',
  summary:
    'Arrow keys walk the points in the order the focus strategy defines. Nearest focus visits every point left to right; group-x visits one representative per x value and shows the whole group. Home and End jump to the ends. The card sends arrow keys.',
  section: 'Tooltips and Focus',
  tags: ['keyboard', 'navigation', 'group-x', 'onFocusChange'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
