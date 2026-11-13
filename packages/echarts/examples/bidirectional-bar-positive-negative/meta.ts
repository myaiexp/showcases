// echarts example: Bi-directional bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bi-directional bar: opposite meanings',
  summary:
    'Income against outcome as a vertical bi-directional bar, and survey answers as a horizontal positive-negative bar. Switch the layout, or swap in the guideline counter-example of two categories with no opposition.',
  section: 'Best Practices',
  tags: ['bar', 'stack', 'axisLabel', 'tooltip.axisPointer', 'itemStyle'],
  docs: [
    'repo/contents/en/best-practices/specification/bar/bi-directional-bar.md',
    'repo/en/option/series/bar.md',
    'repo/en/option/component/axis-common.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
