// vega example: Pivot: Long to Wide
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pivot: Long to Wide",
  summary:
    "Medal counts in long form (country, type, count) pivoted to one row per country with gold, silver and bronze columns, then drawn as stacked bars and listed in the table beside them.",
  section: 'Transforms: Basic',
  tags: ["transform.pivot.groupby", "transform.pivot.field", "transform.pivot.value"],
  docs: ["repo/docs/docs/transforms/pivot.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
