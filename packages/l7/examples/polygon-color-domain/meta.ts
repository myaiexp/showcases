// l7 example: Polygon: color(field, colours): palette by value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: color(field, colours): palette by value",
  summary:
    "color(field, [colours]) maps the field's value range onto the palette, interpolating between the entries.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","color","domain","field"],
  docs: ["repo/site/docs/api/polygon_layer/color.en.md","repo/site/docs/api/common/layer/color.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
