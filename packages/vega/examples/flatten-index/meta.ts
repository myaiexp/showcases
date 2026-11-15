// vega example: Flatten: Array Index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Flatten: Array Index",
  summary:
    "Three runners, each row holding an array of lap times. Flatten turns every lap into its own row with the lap index; the lines and the table beside them redraw when new arrays arrive.",
  section: 'Transforms: Basic',
  tags: ["transform.flatten.fields", "transform.flatten.index", "transform.flatten.as"],
  docs: ["repo/docs/docs/transforms/flatten.md", "repo/docs/docs/marks/group.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
