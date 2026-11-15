// arc(p, r, a, b): strokes with round ends
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "arc(p, r, a, b): strokes with round ends",
  summary: "arc(p, r, a, b) is the distance to an arc of radius r from angle a to b, in radians counterclockwise, and its stroke has round ends. Eight half circles chase around at speeds that depend on their ring.",
  section: "Patterns",
  tags: ["@pattern", "arc", "shape", "repeat"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
