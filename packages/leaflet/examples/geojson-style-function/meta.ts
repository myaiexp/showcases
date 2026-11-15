// leaflet example: GeoJSON style function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON style function",
  summary:
    "Two polygons are coloured by a style function that reads feature.properties.party. A button swaps the parties in the data and calls resetStyle() to run the function again.",
  section: "GeoJSON",
  tags: ["GeoJSON", "style", "resetStyle", "Polygon"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/GeoJSON.js", "repo/docs/examples/geojson/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
