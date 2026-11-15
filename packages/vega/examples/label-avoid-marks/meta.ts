// vega example: Label: Avoid Marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Label: Avoid Marks",
  summary:
    "The same scatter and diagonal trend line twice: labels collide with the line on the left and steer around it on the right with avoidMarks.",
  section: "Transforms: Layout",
  tags: ["transform.label.avoidMarks", "transform.label.anchor", "transform.label.offset"],
  docs: ["repo/docs/docs/transforms/label.md", "repo/docs/docs/marks.md", "repo/docs/docs/marks/group.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
