// vega example: Joinaggregate: Group Statistics on Rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Joinaggregate: Group Statistics on Rows",
  summary:
    "Twenty-one scores in three teams. Joinaggregate writes the team's mean (or median, min, max, quartile) onto every row; white ticks show it, and bars turn red or green by their difference from it.",
  section: 'Transforms: Basic',
  tags: ["transform.joinaggregate.groupby", "transform.joinaggregate.ops", "transform.joinaggregate.fields", "transform.joinaggregate.as", "transform.formula"],
  docs: ["repo/docs/docs/transforms/joinaggregate.md", "repo/docs/docs/transforms/formula.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
