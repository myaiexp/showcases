// tanstack-charts example: Styling tick stubs and the axis line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Styling tick stubs and the axis line',
  summary:
    'axis.line styles only the axis baseline, and axis.ticks.line styles the tick stubs, each with a ChartGuideLineStyle. The grid has its own style. A navy baseline with thick orange stubs and a dashed grid shows that the three are independent, and ticks.line false removes just the stubs.',
  section: 'Scales, Guides, and Color',
  tags: ['axis.line', 'axis.ticks.line', 'ChartGuideLineStyle', 'grid'],
  docs: ['repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
