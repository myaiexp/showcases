// vega example: Regression: Model Parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Regression: Model Parameters",
  summary:
    "Three groups fitted with a polynomial of selectable order. The lines are one regression output; the table is the same transform with params true, one row per group with its coefficients (c0 is the intercept) and R-squared.",
  section: 'Transforms: Basic',
  tags: ["transform.regression.params", "transform.regression.groupby", "transform.regression.method", "transform.regression.order"],
  docs: ["repo/docs/docs/transforms/regression.md", "repo/docs/docs/transforms/formula.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
