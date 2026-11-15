// leaflet example: get-bounds-zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "getBoundsZoom",
  summary:
    "getBoundsZoom(bounds, inside, padding) for four regions: the zoom that fits the bounds in the view, or with inside the one where the view fits inside the bounds, with pixel padding. The map is set to the returned zoom (zoomSnap 0.25).",
  section: "Map events & conversion",
  tags: ["getBoundsZoom", "Rectangle", "setView", "zoomSnap", "LatLngBounds"],
  docs: ['repo/src/map/Map.js', 'repo/src/layer/vector/Rectangle.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
