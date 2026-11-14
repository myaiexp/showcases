// vchart example: Histogram: intervals of different widths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Histogram: intervals of different widths',
  summary:
    'Because the left and right edges come from two fields, the intervals need not be equal: wide bars cover wide ranges and the axis stays continuous. A seriesField colors the bins by size class.',
  section: 'Bar',
  tags: ['histogram', 'xField', 'x2Field', 'seriesField'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Histogram.md',
    'repo/docs/assets/option/en/chart/histogram.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
