// leaflet example: GeoJSON style on points made by pointToLayer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON style on points made by pointToLayer",
  summary:
    "Circles created in pointToLayer are coloured by the layer's style function, the same way lines and polygons are. A slider calls setStyle to change their hue.",
  section: "GeoJSON",
  tags: ["GeoJSON", "pointToLayer", "style", "setStyle", "CircleMarker"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/GeoJSON.js", "repo/docs/examples/geojson/index.md", "repo/docs/examples/geojson/sample-geojson.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
