// l7 example: size: [width, height]
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "size: [width, height]",
  summary:
    "size([1, 2]) means width 1 and height 2: the line is lifted off the ground by its height. Tilt the map to see it; the card orbits.",
  section: "Line Layer",
  tags: ["size","ILineSize","height"],
  docs: ["repo/site/docs/api/line_layer/size.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
