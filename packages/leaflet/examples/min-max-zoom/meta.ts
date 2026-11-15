// leaflet example: setMinZoom and setMaxZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "setMinZoom and setMaxZoom",
  summary:
    "Two sliders call setMinZoom and setMaxZoom while the map is open. The log shows zoomlevelschange and zoomend, and when the current zoom falls outside the new range the map zooms to the limit. getMinZoom and getMaxZoom report the range.",
  section: "Map view",
  tags: ["setMinZoom", "setMaxZoom", "getMinZoom", "getMaxZoom", "zoomlevelschange", "zoomend"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
