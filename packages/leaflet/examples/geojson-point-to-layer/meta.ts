// leaflet example: GeoJSON pointToLayer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON pointToLayer",
  summary:
    "The Denver bicycle-rental points are drawn with the default Marker or, with pointToLayer returning a CircleMarker, as orange circles. A select switches between the two.",
  section: "GeoJSON",
  tags: ["GeoJSON", "pointToLayer", "CircleMarker", "Marker"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/GeoJSON.js", "repo/docs/examples/geojson/index.md", "repo/docs/examples/geojson/sample-geojson.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
