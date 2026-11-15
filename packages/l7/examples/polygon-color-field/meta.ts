// l7 example: Polygon: color(field): the field holds the colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: color(field): the field holds the colour",
  summary:
    "color(field) with no palette reads a colour string straight from each feature's field (here c).",
  section: "Polygon Layer",
  tags: ["PolygonLayer","color","field"],
  docs: ["repo/site/docs/api/polygon_layer/color.en.md","repo/site/docs/api/common/layer/color.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
