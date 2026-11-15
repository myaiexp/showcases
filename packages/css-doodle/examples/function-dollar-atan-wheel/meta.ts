// atan(y, x) is the angle of a point, as a hue
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dollar: a color wheel from atan",
  summary: "atan(y, x) gives the angle of a point and degrees() turns radians into degrees, so a cell's angle around the middle of the grid becomes its hue. The result is a wheel of colors; the variants change the saturation shaping.",
  section: "Values",
  tags: ["$()","atan","degrees","hsl"],
  docs: ["pages/css-doodle-com/reference/function-dollar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
