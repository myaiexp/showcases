// observable-plot example: Regression: confidence level
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Regression: confidence level',
  summary:
    'The ci option of linearRegressionY sets how wide the confidence band is, from 0 (no band) up to 0.99. fillOpacity makes the band easier to see.',
  section: 'Mark: Linear regression',
  tags: ['linearRegressionY', 'ci', 'fillOpacity', 'dot'],
  docs: ['repo/docs/marks/linear-regression.md', 'repo/docs/data/cars.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
