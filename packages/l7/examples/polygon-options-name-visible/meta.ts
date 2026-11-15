// l7 example: Polygon: Layer options name and visible
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: Layer options name and visible",
  summary:
    "name labels a layer so scene.getLayerByName() can find it later; visible: false adds it hidden. Here the two layers swap by name.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","options","name","visible","getLayerByName","show","hide"],
  docs: ["repo/site/docs/api/polygon_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
