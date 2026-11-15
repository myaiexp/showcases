// l7 example: Polygon: scale linear: a fixed domain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: scale linear: a fixed domain",
  summary:
    "type 'linear' with domain [20, 60] stretches the palette across that part of the range: values below 20 and above 60 stay at the ends.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","scale","IScaleConfig","linear"],
  docs: ["repo/site/docs/api/polygon_layer/scale.en.md","repo/site/docs/api/common/layer/scale.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
