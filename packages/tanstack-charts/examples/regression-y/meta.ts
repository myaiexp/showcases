// tanstack-charts example: Fitted line with a confidence band
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fitted line with a confidence band',
  summary:
    'linearRegressionY draws the least-squares line through the scatter and shades the 95 percent confidence band of the fitted mean. The dots are an ordinary dot mark over the same rows; only the fitted line takes part in hover.',
  section: 'Linear Regression Marks',
  tags: ['linearRegressionY', 'dot', 'ci'],
  docs: ['repo/docs/reference/marks/regression.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
