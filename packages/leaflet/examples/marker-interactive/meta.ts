// leaflet example: Non-interactive and bubbling markers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Non-interactive and bubbling markers",
  summary: "Where a click on a marker goes. A normal marker fires click and the map does not; interactive: false makes the marker invisible to the pointer so the map gets the click; bubblingPointerEvents: true fires it on both.",
  section: "Markers & icons",
  tags: ["Marker", "interactive", "bubblingPointerEvents", "map.on('click')", "click"],
  docs: ["repo/src/layer/Layer.js", "repo/src/layer/marker/Marker.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
