// leaflet example: Layers control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layers control",
  summary:
    "The layers tutorial's control: LayersControl with two tile base layers as radio buttons and the Colorado cities LayerGroup as a checkbox. Only one base layer is added to the map; the control reflects what is on it.",
  section: "Layer groups",
  tags: ["LayersControl", "LayerGroup", "TileLayer", "baseLayers", "overlays"],
  docs: ["repo/src/control/LayersControl.js", "repo/docs/examples/layers-control/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
