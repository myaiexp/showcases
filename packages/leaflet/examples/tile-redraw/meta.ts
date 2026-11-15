// leaflet example: redraw()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "redraw()",
  summary:
    "A tile URL with a ?v={version} key. Refresh raises the version in the layer's options and calls redraw(), which unloads every tile and requests them again with the new URL. The card refreshes by itself every few seconds.",
  section: "Tile layers",
  tags: ["TileLayer", "redraw", "options", "tileunload", "tileloadstart", "load"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/GridLayer.js", "repo/src/layer/tile/TileLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
