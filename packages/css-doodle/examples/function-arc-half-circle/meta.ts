// @arc(r; from; to; at) as the d of a path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: path data for an arc",
  summary: "@arc gives the path data of an arc, L … A …, for a path d. Angles are degrees clockwise from three o'clock, so from 0 to 180 draws the lower half of the circle of radius 36 around 50 50. The variants sweep other ranges.",
  section: "SVG",
  tags: ["@arc","@svg","path","d"],
  docs: ["pages/css-doodle-com/reference/function-arc.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
