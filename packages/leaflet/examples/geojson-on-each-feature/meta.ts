// leaflet example: GeoJSON onEachFeature popups
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON onEachFeature popups",
  summary:
    "Bus lines, light-rail stops and a stadium from the Denver data get a popup from onEachFeature when the feature has a popupContent property. The log lists each call.",
  section: "GeoJSON",
  tags: ["GeoJSON", "onEachFeature", "bindPopup", "popupContent"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/src/layer/GeoJSON.js',
    'repo/docs/examples/geojson/index.md',
    'repo/docs/examples/geojson/sample-geojson.js',
    'repo/src/map/Map.js',
    'repo/src/layer/LayerGroup.js',
    'repo/src/layer/marker/Marker.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
