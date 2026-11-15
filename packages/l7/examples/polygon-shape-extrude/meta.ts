// l7 example: shape('extrude'): 3D blocks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shape('extrude'): 3D blocks",
  summary:
    "shape('extrude') stretches each polygon up along Z. size() is the height: here the floor field maps to a height range.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","shape","extrude","size"],
  docs: ["repo/site/docs/api/polygon_layer/shape.en.md","repo/site/docs/api/polygon_layer/size.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
