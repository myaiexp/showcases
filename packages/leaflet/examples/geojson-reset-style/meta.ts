// leaflet example: GeoJSON setStyle and resetStyle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON setStyle and resetStyle",
  summary:
    "Three Denver bus segments are styled by a function on properties.underConstruction. Buttons call setStyle with an object, setStyle with a function, resetStyle() for the whole layer, and resetStyle(layer) for one segment.",
  section: "GeoJSON",
  tags: ["GeoJSON", "setStyle", "resetStyle", "style"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/GeoJSON.js", "repo/docs/examples/geojson/index.md", "repo/docs/examples/geojson/sample-geojson.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
