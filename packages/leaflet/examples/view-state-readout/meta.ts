// leaflet example: view-state-readout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Live view state",
  summary:
    "A live readout of the map's state getters: getCenter, getZoom, getBounds, getSize, getPixelBounds and getPixelOrigin, refreshed on move, zoom, viewreset and resize. The card flies between cities.",
  section: "Map events & conversion",
  tags: ["getCenter", "getZoom", "getBounds", "getSize", "getPixelBounds", "getPixelOrigin", "flyTo"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
