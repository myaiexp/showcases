// leaflet example: LayerGroup methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LayerGroup methods",
  summary:
    "LayerGroup's methods on four markers: addLayer, removeLayer, hasLayer, getLayers, eachLayer (binding a permanent tooltip to each) and clearLayers. A readout lists the layers in the group after each call.",
  section: "Layer groups",
  tags: ["LayerGroup", "addLayer", "removeLayer", "hasLayer", "getLayers", "eachLayer", "clearLayers"],
  docs: [
    'repo/src/layer/LayerGroup.js',
    'repo/docs/examples/layers-control/index.md',
    'repo/src/layer/Layer.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
