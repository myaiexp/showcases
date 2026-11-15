// A bare M starts a new arc: two corners make a tile
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: Truchet tiles",
  summary: "A bare M starts a new arc, so @arc(.5, 0 to 90) M @arc(.5 at 1, 180 to 270) draws arcs around two opposite corners of a unit tile. Each of 36 tiles is turned by 0 or 90 degrees at random, and the arcs join into winding paths.",
  section: "SVG",
  tags: ["@arc","M","path*6x6","@p","Truchet"],
  docs: ["pages/css-doodle-com/reference/function-arc.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
