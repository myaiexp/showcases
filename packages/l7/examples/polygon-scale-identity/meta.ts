// l7 example: Polygon: scale identity: use the value as is
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: scale identity: use the value as is",
  summary:
    "type 'identity' leaves the field's value untouched: the c field already holds the colours.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","scale","IScaleConfig","identity"],
  docs: ["repo/site/docs/api/polygon_layer/scale.en.md","repo/site/docs/api/common/layer/scale.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
