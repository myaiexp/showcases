// observable-plot example: Regression: model from m points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Regression: model from m points',
  summary:
    'The regression is fit to only the first m cars, drawn bright over faint dots for the rest. A line appears at two points and the confidence band tightens as the slider adds data.',
  section: 'Mark: Linear regression',
  tags: ['linearRegressionY', 'dot', 'slice', 'fillOpacity'],
  docs: ['repo/docs/marks/linear-regression.md', 'repo/docs/data/cars.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
