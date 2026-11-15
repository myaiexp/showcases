// tanstack-charts example: Tooltip fixed to plot positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip fixed to plot positions',
  summary:
    'The axis anchors also accept plot positions: plot-left, plot-center and plot-right for x, and plot-top, plot-center and plot-bottom for y. With plot-center on x and plot-top on y the tooltip becomes a fixed panel at the top of the chart that only changes its content.',
  section: 'Focus and Interaction',
  tags: ['tooltip.anchor', 'plot-center', 'plot-top', 'placement', 'offset'],
  docs: ['repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
