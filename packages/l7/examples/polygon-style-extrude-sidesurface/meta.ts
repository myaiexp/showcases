// l7 example: style sidesurface: hide the walls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style sidesurface: hide the walls",
  summary:
    "sidesurface: false draws only the roofs, floating at their heights. It takes effect with pickLight: true; the plain extrude shader ignores it.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","style","sidesurface","extrude"],
  docs: ["repo/site/docs/api/polygon_layer/style.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
