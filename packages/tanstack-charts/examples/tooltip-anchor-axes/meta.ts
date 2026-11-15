// tanstack-charts example: Per-axis tooltip anchors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Per-axis tooltip anchors',
  summary:
    'anchor can name each coordinate separately. x value with y plot-top follows the focused week horizontally while the tooltip stays pinned to the top edge of the plot, placed below its anchor.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.anchor', 'plot-top', 'value', 'placement'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
