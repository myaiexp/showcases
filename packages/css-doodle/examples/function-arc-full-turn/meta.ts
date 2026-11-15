// to: 360 or more draws the whole circle as two arcs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: a full turn is the whole circle",
  summary: "The default to is 360, and a sweep of a full turn or more is the whole circle, drawn as two arcs. Leaving the angles out, to: 360 and to: 720 all give the same circle.",
  section: "SVG",
  tags: ["@arc","to","circle"],
  docs: ["pages/css-doodle-com/reference/function-arc.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
