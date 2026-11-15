// l7 example: style extrusionBase: constant base height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style extrusionBase: constant base height",
  summary:
    "On the extrusion shape, extrusionBase is the base height in metres. A single number lifts every block's bottom by the same amount; the top stays where size() put it.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","style","extrusionBase","extrusion"],
  docs: ["repo/site/docs/api/polygon_layer/style.en.md","repo/site/docs/api/polygon_layer/shape.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
