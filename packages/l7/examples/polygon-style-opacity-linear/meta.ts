// l7 example: style opacityLinear: radial fade
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style opacityLinear: radial fade",
  summary:
    "opacityLinear { enable, dir } fades a filled polygon radially: 'in' is opaque in the middle, 'out' opaque at the edge. Switch the direction or turn the effect off.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","style","opacityLinear","IOpacityLinear"],
  docs: ["repo/site/docs/api/polygon_layer/style.en.md","repo/site/docs/tutorial/polygon/fill.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
