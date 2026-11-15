// @arc(40 at 50 50, 0 to 180) lists the same values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: the short form",
  summary: "The short form lists radii, center and angles in one line: @arc(40 at 50 50, 0 to 180) is the same as @arc(r: 40; at: 50 50; from: 0; to: 180). With no from, to alone starts at 0, and without angles it is a full circle.",
  section: "SVG",
  tags: ["@arc","at","to"],
  docs: ["pages/css-doodle-com/reference/function-arc.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
