// leaflet example: GeoJSON coordsToLatLng
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON coordsToLatLng",
  summary:
    "A site plan with coordinates in metres is drawn with a coordsToLatLng function that converts them to LatLngs near Denver. A select shows the same data read by default as longitude and latitude.",
  section: "GeoJSON",
  tags: ["GeoJSON", "coordsToLatLng", "LatLng", "getBounds", "fitBounds"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ['repo/src/layer/GeoJSON.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
