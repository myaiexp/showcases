// vega example: Window: Filling Missing Values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Window: Filling Missing Values",
  summary:
    "A series with null and absent values. prev_value carries the last present value forward (a step line), next_value pulls the following one back; hollow orange rings mark the filled gaps.",
  section: 'Transforms: Basic',
  tags: ["transform.window.ops", "transform.window.fields", "transform.window.as", "transform.window.sort"],
  docs: ["repo/docs/docs/transforms/window.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
