// Two arcs drawn back the other way make a ring piece
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: a second arc closes a ring segment",
  summary: "An outer arc going one way and an inner arc going back, closed with Z, is a segment of a ring. The second arc runs from -30 back to -150, so the path continues round it instead of jumping. The variants change the thickness and the span.",
  section: "SVG",
  tags: ["@arc","Z","ring segment"],
  docs: ["pages/css-doodle-com/reference/function-arc.md","repo/docs/grammar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
