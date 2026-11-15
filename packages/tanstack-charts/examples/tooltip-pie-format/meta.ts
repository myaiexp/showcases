// tanstack-charts example: Pie slices with a formatted tooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pie slices with a formatted tooltip',
  summary:
    'The default tooltip prints raw x and y, which mean nothing for a pie or a polar chart. A format callback turns the slice datum into a readable line. Painted slice geometry already takes part in default nearest focus, including the donut hole.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.format', 'radialArc', 'pie', 'donut'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
