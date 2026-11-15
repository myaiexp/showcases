// tanstack-charts example: Restyling the active row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Restyling the active row',
  summary:
    'The row of the hovered point is bold with a shaded background. The emphasis reads CSS variables, so a class set through tooltip.className can tone it down without replacing the tooltip body.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.className', 'active', '--ts-chart-tooltip-active-row-background'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
