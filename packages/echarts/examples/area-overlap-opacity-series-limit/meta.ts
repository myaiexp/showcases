// echarts example: Area chart guidelines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area chart guidelines: overlap and series count',
  summary:
    'Overlapping area layers with an opacity you choose, a stacked area, and a percentage-stacked area from the same data. Add series one at a time to see why the guideline asks for three at most.',
  section: 'Best Practices',
  tags: ['line', 'areaStyle.opacity', 'stack', 'emphasis.focus', 'lineStyle'],
  docs: [
    'repo/contents/en/best-practices/specification/line/area.md',
    'repo/contents/en/best-practices/specification/line/stacked-area.md',
    'repo/en/option/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
