// l7 example: Polygon extrude: a 3D price map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon extrude: a 3D price map",
  summary:
    "The tutorial's 3D fill: shape('extrude'), colour from unit_price, height from a callback on the same field, and an opacity mapped from the field through the style.",
  section: "Tutorial: Polygon",
  tags: ["PolygonLayer","extrude","color","size","callback","style","opacity","pickLight"],
  docs: ["repo/site/docs/tutorial/polygon/extrude.en.md","repo/site/docs/api/polygon_layer/shape.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
