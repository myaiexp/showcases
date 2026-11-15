// leaflet example: GeoJSON coordinate helpers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON coordinate helpers",
  summary:
    "Clicking the map adds vertices. The static GeoJSON methods latLngToCoords, coordsToLatLng, asFeature and latLngsToCoords are called on them, with a precision slider and a close toggle, and their results are listed.",
  section: "GeoJSON",
  tags: ["GeoJSON.latLngToCoords", "GeoJSON.latLngsToCoords", "GeoJSON.coordsToLatLng", "GeoJSON.asFeature"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/src/layer/GeoJSON.js',
    'repo/src/layer/GeoJSONUtil.js',
    'repo/src/map/Map.js',
    'repo/src/layer/vector/Polyline.js',
    'repo/src/layer/DivOverlay.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
