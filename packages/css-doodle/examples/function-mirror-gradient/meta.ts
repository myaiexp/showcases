// @mirror inside linear-gradient makes it symmetric
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mirror: a symmetric gradient",
  summary: "Wrapping the color stops in @mirror makes the gradient run to its last color and straight back, so the left and right halves match. The variants add colors to the list.",
  section: "Values",
  tags: ["@mirror","linear-gradient"],
  docs: ["pages/css-doodle-com/reference/function-mirror.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
