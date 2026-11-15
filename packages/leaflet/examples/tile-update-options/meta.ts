// leaflet example: When tiles update
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "When tiles update",
  summary:
    "Toggles and sliders for updateWhenIdle, updateWhenZooming, updateInterval and keepBuffer, each of which rebuilds the layer. Buttons pan 900 px or fly between two places, and the side panel counts tiles requested (and how many before the move ended) and tiles unloaded.",
  section: "Tile layers",
  tags: ["GridLayer", "updateWhenIdle", "updateWhenZooming", "updateInterval", "keepBuffer", "panBy", "flyTo"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/GridLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
