// leaflet example: distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Distance between two points",
  summary:
    "Two markers joined by a line, with map.distance() giving the distance between them in meters (the map's CRS, EPSG:3857 by default). Drag either marker in the full view; the card moves one around the other.",
  section: "Map events & conversion",
  tags: ["distance", "Marker", "draggable", "Polyline", "setLatLngs"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
