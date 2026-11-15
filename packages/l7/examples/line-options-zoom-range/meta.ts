// l7 example: Layer options minZoom and maxZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer options minZoom and maxZoom",
  summary:
    "minZoom and maxZoom make the layer appear only inside a zoom window. Zoom the map past the window and the lines vanish; the card zooms in and out by itself.",
  section: "Line Layer",
  tags: ["options","minZoom","maxZoom"],
  docs: ["repo/site/docs/api/line_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
