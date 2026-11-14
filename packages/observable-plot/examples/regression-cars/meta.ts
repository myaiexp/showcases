// observable-plot example: Regression: cars weight and power
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Regression: cars weight and power',
  summary:
    'A dot scatterplot of car weight and power with a red least-squares line from linearRegressionY. The pale band around the line is the 95 percent confidence interval.',
  section: 'Mark: Linear regression',
  tags: ['linearRegressionY', 'dot', 'stroke'],
  docs: ['repo/docs/marks/linear-regression.md', 'repo/docs/data/cars.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
