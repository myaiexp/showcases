// l7 example: size(field, callback): height by rule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "size(field, callback): height by rule",
  summary:
    "size(field, callback) calls your function with each field value; whatever it returns is the height. Here the floors above 6 are tripled to stand out.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","size","callback","extrude"],
  docs: ["repo/site/docs/api/polygon_layer/size.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
