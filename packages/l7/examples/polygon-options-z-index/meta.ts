// l7 example: Polygon: Layer option zIndex: draw order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: Layer option zIndex: draw order",
  summary:
    "Layers are drawn in zIndex order, larger on top. Two layers cover the same countries: flip which one wins.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","options","zIndex","setIndex"],
  docs: ["repo/site/docs/api/polygon_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
