// l7 example: Heatmap: Layer options minZoom and maxZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmap: Layer options minZoom and maxZoom",
  summary:
    "minZoom and maxZoom limit the zoom levels at which the layer is drawn; outside the range it disappears.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","options","minZoom","maxZoom"],
  docs: ["repo/site/docs/api/heatmap_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
