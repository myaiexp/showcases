// leaflet example: GeoJSON.geometryToLayer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON.geometryToLayer",
  summary:
    "GeoJSON.geometryToLayer builds a layer from a Point, a Polygon or a FeatureCollection, with pointToLayer in its options, and the example adds the result to the map itself. The caption names what came back.",
  section: "GeoJSON",
  tags: ["GeoJSON.geometryToLayer", "pointToLayer", "CircleMarker", "FeatureGroup"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ['repo/src/layer/GeoJSON.js', 'repo/src/layer/vector/CircleMarker.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
