// tanstack-charts example: A custom anchor function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom anchor function',
  summary:
    'anchor accepts a function that receives the focused points and the focus, pointer, plot and scale state, and returns scene coordinates. This one pins the tooltip to the bottom of the plot under the focused x. Returning nothing falls back to the point.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.anchor', 'ChartTooltipAnchorContext', 'scales', 'plot'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
