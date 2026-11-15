// l7 example: Polygon: Layer option autoFit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: Layer option autoFit",
  summary:
    "autoFit: true zooms the map to the layer's extent as soon as the layer has initialised. Jump away, then add the layer again.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","options","autoFit"],
  docs: ["repo/site/docs/api/polygon_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
