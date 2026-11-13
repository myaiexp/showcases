// echarts example: Rounded and padded sectors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rounded and padded sectors',
  summary:
    'A doughnut of five sources. Change padAngle for the gap between sectors, borderRadius for the corner roundness, and whether the inner corners, the outer corners or all four are rounded.',
  section: 'Option: series.pie',
  tags: ['pie', 'padAngle', 'itemStyle.borderRadius', 'radius'],
  docs: ['repo/en/option/series/pie.md', 'repo/en/option/partial/sector-border-radius.md', 'repo/en/option/partial/item-style.md', 'repo/contents/en/basics/release-note/5-5-0.md', 'repo/contents/en/basics/release-note/5-3-0.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
