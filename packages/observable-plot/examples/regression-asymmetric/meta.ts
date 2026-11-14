// observable-plot example: Regression: Y on X versus X on Y
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Regression: Y on X versus X on Y',
  summary:
    'linearRegressionY predicts power from weight and linearRegressionX predicts weight from power. The two lines differ unless the points are perfectly aligned.',
  section: 'Mark: Linear regression',
  tags: ['linearRegressionY', 'linearRegressionX', 'dot'],
  docs: ['repo/docs/marks/linear-regression.md', 'repo/docs/data/cars.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
