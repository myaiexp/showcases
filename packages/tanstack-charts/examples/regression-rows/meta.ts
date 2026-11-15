// tanstack-charts example: Fitted rows with linearRegressionRowsY
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fitted rows with linearRegressionRowsY',
  summary:
    'linearRegressionRowsY returns the sampled fit as plain rows, so the same numbers can feed a mark and a table. The samples option sets how many evenly spaced points the fit has; the readout lists the first rows, and the fitted rows are drawn as a line with dots.',
  section: 'Linear Regression Marks',
  tags: ['linearRegressionRowsY', 'samples', 'lineY', 'dot'],
  docs: [
    'repo/docs/reference/marks/regression.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
