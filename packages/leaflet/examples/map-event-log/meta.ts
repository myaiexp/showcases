// leaflet example: map-event-log
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Map event log",
  summary:
    "Logs the map's view events as they fire: movestart, move, moveend, zoomstart, zoom, zoomend, viewreset and resize. Buttons run panBy, setZoom, flyTo, setView without animation and a container resize; runs of move and zoom are counted on one line.",
  section: "Map events & conversion",
  tags: ["movestart", "move", "moveend", "zoomstart", "zoom", "zoomend", "viewreset", "resize", "panBy", "flyTo"],
  docs: ["repo/src/map/Map.js", "repo/src/core/Events.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
