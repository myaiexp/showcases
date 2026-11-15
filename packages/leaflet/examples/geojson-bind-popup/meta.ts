// leaflet example: GeoJSON layer bindPopup with a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON layer bindPopup with a function",
  summary:
    "Three coloured polygons come from one GeoJSON layer. A single bindPopup with a function on the layer opens a popup with the description of whichever polygon was clicked.",
  section: "GeoJSON",
  tags: ["GeoJSON", "bindPopup", "style", "FeatureGroup"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/GeoJSON.js", "repo/src/layer/Layer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
