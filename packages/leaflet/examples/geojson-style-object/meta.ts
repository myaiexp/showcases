// leaflet example: GeoJSON style object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON style object",
  summary:
    "Two LineStrings are drawn with the style option given as one object (color, weight, opacity). A slider changes the weight and builds the layer again with the new object.",
  section: "GeoJSON",
  tags: ["GeoJSON", "style", "LineString"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/GeoJSON.js", "repo/docs/examples/geojson/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
