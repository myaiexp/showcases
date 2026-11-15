// vega example: Fold: Wide to Long
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fold: Wide to Long",
  summary:
    "A wide table with one column per region folded into region and sales rows. One faceted line mark then draws all three series; the table lists the first folded rows.",
  section: 'Transforms: Basic',
  tags: ["transform.fold.fields", "transform.fold.as", "marks.group.from.facet"],
  docs: ["repo/docs/docs/transforms/fold.md", "repo/docs/docs/marks/group.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
