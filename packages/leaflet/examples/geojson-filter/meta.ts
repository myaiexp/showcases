// leaflet example: GeoJSON filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON filter",
  summary:
    "Two stadium features, one with show_on_map false, are added through a filter that leaves it out. Buttons set the filter to allow all and re-add the data, showing that a changed filter only affects data added afterwards.",
  section: "GeoJSON",
  tags: ["GeoJSON", "filter", "addData", "clearLayers", "bindTooltip"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/src/layer/GeoJSON.js',
    'repo/docs/examples/geojson/index.md',
    'repo/src/layer/LayerGroup.js',
    'repo/src/layer/Layer.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
