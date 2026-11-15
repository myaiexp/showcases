// leaflet example: Choropleth: highlight on hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Choropleth: highlight on hover",
  summary:
    "Pointer over a state sets a thick grey border and brings it to front; pointer out calls geojson.resetStyle. The listeners are attached in onEachFeature with pointerover and pointerout.",
  section: "Choropleth",
  tags: ["GeoJSON", "onEachFeature", "pointerover", "pointerout", "resetStyle", "bringToFront"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/docs/examples/choropleth/index.md',
    'repo/docs/examples/choropleth/us-states.js',
    'repo/src/layer/GeoJSON.js',
    'repo/MIGRATION.md',
    'repo/src/layer/DivOverlay.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
