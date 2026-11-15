// l7 example: Polygon: Layer options minZoom and maxZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: Layer options minZoom and maxZoom",
  summary:
    "minZoom and maxZoom limit the zoom levels at which the layer is drawn; outside the range it disappears.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","options","minZoom","maxZoom"],
  docs: ["repo/site/docs/api/polygon_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
