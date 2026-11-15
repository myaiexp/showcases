// leaflet example: SimpleCRS route between stars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SimpleCRS route between stars",
  summary:
    "A Polyline between Sol and Deneb on the star map, with a marker travelling along it and map.distance giving the length in map units.",
  section: "Coordinate systems",
  tags: ["SimpleCRS", "Polyline", "distance", "CircleMarker"],
  docs: ["repo/docs/examples/crs-simple/index.md", "repo/src/geo/crs/SimpleCRS.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
