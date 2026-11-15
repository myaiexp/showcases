// leaflet example: Attribution from layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Attribution from layers",
  summary:
    "The attribution control collects each layer's attribution on its own: a detail layer with minZoom 5 appears in the text only from zoom 5, and a labels layer's text comes and goes as the layer is added and removed.",
  section: "Controls",
  tags: ["AttributionControl", "attribution", "minZoom", "layeradd", "layerremove"],
  docs: ['repo/src/control/AttributionControl.js', 'repo/src/layer/LayerBase.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
