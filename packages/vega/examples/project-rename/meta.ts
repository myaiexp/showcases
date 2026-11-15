// vega example: Project: Unnest and Rename
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Project: Unnest and Rename",
  summary:
    "Rows with nested station and reading objects projected to flat name, altitude and temp fields; the upper table shows the raw nested rows ({...}) and the lower one the result that drives the bars.",
  section: 'Transforms: Basic',
  tags: ["transform.project.fields", "transform.project.as"],
  docs: ["repo/docs/docs/transforms/project.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
