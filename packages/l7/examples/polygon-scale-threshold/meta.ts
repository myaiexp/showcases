// l7 example: Polygon: scale threshold: manual breaks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: scale threshold: manual breaks",
  summary:
    "type 'threshold' splits at your own breaks: with domain [30, 70] the range needs three colours.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","scale","IScaleConfig","threshold"],
  docs: ["repo/site/docs/api/polygon_layer/scale.en.md","repo/site/docs/api/common/layer/scale.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
