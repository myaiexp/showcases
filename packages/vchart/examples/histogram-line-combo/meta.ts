// vchart example: Histogram: with a line series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Histogram: with a line series',
  summary:
    'A common chart combines a bar series on x0 and x2 with a line series over the same bins; two left and right value axes bind to the series through seriesIndex and seriesId, and a band bottom axis labels the intervals.',
  section: 'Bar',
  tags: ['common', 'series', 'axes.seriesIndex', 'axes.seriesId', 'x2Field'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Histogram.md',
    'repo/docs/assets/option/en/chart/histogram.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
