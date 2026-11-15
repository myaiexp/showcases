// leaflet example: GridLayer with canvas tiles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GridLayer with canvas tiles",
  summary:
    "A GridLayer subclass whose createTile() returns a <canvas> sized with getTileSize() and drawn from the tile's coords: a circle that grows with zoom, coloured by x and y. It lies over a dark tile layer; a select changes tileSize.",
  section: "Tile layers",
  tags: ["GridLayer", "createTile", "getTileSize", "tileSize"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/docs/examples/extending-2-layers/index.md',
    'repo/src/layer/tile/GridLayer.js',
    'repo/src/map/Map.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
