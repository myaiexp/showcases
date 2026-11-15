// vega example: Statistics: Regression
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Statistics: Regression Models',
  summary:
    'Thirty-two curved points fitted by regressionLinear, Log, Exp, Pow, Quad, Poly and Loess; the fitted curve is drawn from sampleCurve (white dots show where it samples densely) with coefficients and R squared in the label.',
  section: 'Statistics',
  tags: ['statistics.regressionLinear', 'statistics.regressionPoly', 'statistics.regressionLoess', 'statistics.sampleCurve'],
  docs: ['repo/docs/docs/api/statistics.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
