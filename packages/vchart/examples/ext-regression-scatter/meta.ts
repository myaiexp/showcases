// vchart example: Regression lines on a scatter plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Regression lines on a scatter plot',
  summary:
    'appendScatterRegressionLineConfig fits a linear, logistic, lowess or polynomial regression through scatter points, with a styled line, label and confidence band. A select picks the type and a slider the polynomial degree.',
  section: 'Extensions',
  tags: ['appendScatterRegressionLineConfig', 'linear', 'polynomial', 'lowess', 'logistic', 'polynomialDegree', 'confidenceInterval'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/regression_line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
