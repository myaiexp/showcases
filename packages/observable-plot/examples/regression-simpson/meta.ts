// observable-plot example: Regression: Simpson paradox on penguins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Regression: Simpson paradox on penguins',
  summary:
    'Culmen depth against length for three penguin species. A regression per species slopes up while the single pooled regression slopes down; stroke by species splits the fit, and two toggles show each on its own.',
  section: 'Mark: Linear regression',
  tags: ['linearRegressionY', 'dot', 'stroke', 'fill', 'legend'],
  docs: ['repo/docs/marks/linear-regression.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
