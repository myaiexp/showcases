// vega example: Impute: Methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Impute: Methods",
  summary:
    "Two series with one or two gaps each. The hollow rings are imputed rows, and the method (mean, median, min or max of the series' own values) moves them up and down.",
  section: 'Transforms: Basic',
  tags: ["transform.impute.method", "transform.impute.groupby", "transform.impute.key", "transform.impute.field"],
  docs: ["repo/docs/docs/transforms/impute.md", "repo/docs/docs/marks/group.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
