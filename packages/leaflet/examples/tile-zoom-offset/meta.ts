// leaflet example: Tile size and zoomOffset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tile size and zoomOffset",
  summary:
    "Three combinations of tileSize and zoomOffset against one server. 256px tiles with offset 0 are the default; 512px tiles with zoomOffset -1 request the @2x images one zoom shallower and fit the grid; 512px with offset 0 asks for the wrong zoom. The log shows the map zoom beside the tile's z, x and y.",
  section: "Tile layers",
  tags: ["TileLayer", "tileSize", "zoomOffset", "minZoom"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/TileLayer.js", "repo/src/layer/tile/GridLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
