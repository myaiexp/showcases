// l7 example: size(field): height from a field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "size(field): height from a field",
  summary:
    "size(field) with no range takes the field's own value as the height: here a height column of metres-like numbers up to 400.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","size","field","extrude"],
  docs: ["repo/site/docs/api/polygon_layer/size.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
