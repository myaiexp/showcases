// leaflet example: Tile URL template
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tile URL template",
  summary:
    "Zoom and pan a map whose tile layer URL is the template https://{s}.tiles.example/grid/{z}/{x}/{y}{r}.png. Each tile Leaflet asks for adds the URL it built (subdomain, zoom, column, row) to the log; the tiles print the same z, x and y. The card moves the view between three places.",
  section: "Tile layers",
  tags: ["TileLayer", "url template", "{s}", "{z}", "{x}", "{y}", "{r}", "tileloadstart"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/src/layer/tile/TileLayer.js',
    'repo/src/core/Util.js',
    'repo/src/layer/tile/GridLayer.js',
    'repo/src/map/Map.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
