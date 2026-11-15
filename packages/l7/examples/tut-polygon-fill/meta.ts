// l7 example: Polygon fill: a density map with borders
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon fill: a density map with borders",
  summary:
    "The tutorial's fill map: a PolygonLayer coloured by a density field through a quantile scale, with hover highlight, and a second LineLayer drawing dashed white borders over it.",
  section: "Tutorial: Polygon",
  tags: ["PolygonLayer","LineLayer","fill","scale","quantile","active","lineType","dashArray"],
  docs: ["repo/site/docs/tutorial/polygon/fill.en.md","repo/site/docs/api/polygon_layer/shape.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
