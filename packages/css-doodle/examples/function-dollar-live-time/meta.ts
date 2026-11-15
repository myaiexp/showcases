// $deg(@t / 100 * @i) turns each line at its own speed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dollar: a live value becomes CSS math",
  summary: "@t has no number when the doodle is generated, so the expression around it becomes CSS math and the browser keeps evaluating it. Each of the twelve lines rotates at a speed proportional to its index.",
  section: "Values",
  tags: ["$deg","@t","@i","rotate"],
  docs: ["pages/css-doodle-com/reference/function-dollar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
