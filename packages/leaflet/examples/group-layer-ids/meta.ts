// leaflet example: Layer ids in a group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer ids in a group",
  summary:
    "getLayerId returns each layer's internal id; getLayer, hasLayer and removeLayer accept that id in place of the layer. A table shows the ids and buttons remove layers by number.",
  section: "Layer groups",
  tags: ["LayerGroup", "getLayerId", "getLayer", "hasLayer", "removeLayer"],
  docs: ["repo/src/layer/LayerGroup.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
