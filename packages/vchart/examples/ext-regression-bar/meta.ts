// vchart example: Regression lines on a bar chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Regression lines on a bar chart',
  summary:
    'appendBarRegressionLineConfig adds polynomial fits to a simple bar chart, each with a line style, a label and an optional confidence interval. Choose the polynomial degree and whether the band shows; the card steps the degree and the fit redraws.',
  section: 'Extensions',
  tags: ['registerRegressionLine', 'appendBarRegressionLineConfig', 'degree', 'confidenceInterval', 'label'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/regression_line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
