// echarts example: Pie chart guidelines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pie chart guidelines: order and Other',
  summary:
    'The pie specification as switches: sectors sorted large to small clockwise from the top versus unsorted, a long tail merged into Other versus every slice, and one sector emphasised with selectedOffset.',
  section: 'Best Practices',
  tags: ['pie', 'startAngle', 'clockwise', 'selectedMode', 'selectedOffset', 'data.selected'],
  docs: [
    'repo/contents/en/best-practices/specification/pie/basic-pie.md',
    'repo/en/option/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
