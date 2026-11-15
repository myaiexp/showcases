// leaflet example: Adding and removing layers in the control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Adding and removing layers in the control",
  summary:
    "addBaseLayer, addOverlay and removeLayer on a LayersControl already on the map. Removing an entry leaves the layer itself where it was.",
  section: "Layer groups",
  tags: ["LayersControl", "addBaseLayer", "addOverlay", "removeLayer"],
  docs: ["repo/src/control/LayersControl.js", "repo/docs/examples/layers-control/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
