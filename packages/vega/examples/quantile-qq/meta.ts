// vega example: Quantile: Quantile-Quantile Plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Quantile: Quantile-Quantile Plot",
  summary:
    "Quantiles of a symmetric and a right-skewed sample, paired by probability with a pivot. The points bend away from the dashed y = x line where the skewed sample's tail is longer; the step sets how many quantiles are sampled.",
  section: 'Transforms: Basic',
  tags: ["transform.quantile.field", "transform.quantile.groupby", "transform.quantile.step", "transform.quantile.as", "transform.pivot"],
  docs: ["repo/docs/docs/transforms/quantile.md", "repo/docs/docs/transforms/pivot.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
