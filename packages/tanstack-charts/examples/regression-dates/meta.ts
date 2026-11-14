// tanstack-charts example: Trend over dates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Trend over dates',
  summary:
    'The independent channel can be a Date: the fit centres its sums so millisecond values stay stable. Daily readings with a slow upward drift get a trend line and band on a UTC time axis.',
  section: 'Linear Regression Marks',
  tags: ['linearRegressionY', 'Date', 'scaleUtc', 'lineY'],
  docs: ['repo/docs/reference/marks/regression.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
