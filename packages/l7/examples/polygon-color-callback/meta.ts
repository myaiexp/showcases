// l7 example: Polygon: color(field, callback): colour by rule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: color(field, callback): colour by rule",
  summary:
    "color(field, callback) hands your function each field value and paints with what it returns, here by category.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","color","callback","field"],
  docs: ["repo/site/docs/api/polygon_layer/color.en.md","repo/site/docs/api/common/layer/color.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
