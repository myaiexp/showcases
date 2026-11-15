// l7 example: shape('extrusion'): blocks with a base height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shape('extrusion'): blocks with a base height",
  summary:
    "'extrusion' is the upgraded extrude: besides the height from size(), style({ extrusionBase }) lifts each block's bottom, mapped here from the base field.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","shape","extrusion","extrusionBase"],
  docs: ["repo/site/docs/api/polygon_layer/shape.en.md","repo/site/docs/api/polygon_layer/style.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
