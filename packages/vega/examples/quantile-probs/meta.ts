// vega example: Quantile: Probabilities and Step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Quantile: Probabilities and Step",
  summary:
    "A 110-value sample with orange rules at the quantiles of chosen probabilities: quartiles, 5/50/95, deciles or just the median. Each rule is one row of the quantile output (prob and value).",
  section: 'Transforms: Basic',
  tags: ["transform.quantile.probs", "transform.quantile.as", "transform.quantile.field"],
  docs: ["repo/docs/docs/transforms/quantile.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
