// leaflet example: Layers control and zoom limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layers control and zoom limits",
  summary:
    "The LayersControl disables the entry of a layer whose minZoom or maxZoom the current zoom is outside of. Two tile overlays have different ranges; a caption counts the disabled entries as the zoom changes.",
  section: "Layer groups",
  tags: ["LayersControl", "minZoom", "maxZoom", "zoomend"],
  docs: ['repo/src/control/LayersControl.js', 'repo/src/layer/LayerGroup.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
