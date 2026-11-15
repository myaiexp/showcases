// leaflet example: GeoJSON addData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON addData",
  summary:
    "An empty GeoJSON layer over Denver gets one more point each time addData is called, or all the rest as an array. A last press calls clearLayers so it can start again.",
  section: "GeoJSON",
  tags: ["GeoJSON", "addData", "clearLayers", "getLayers"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ['repo/src/layer/GeoJSON.js', 'repo/docs/examples/geojson/index.md', 'repo/src/layer/LayerGroup.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
