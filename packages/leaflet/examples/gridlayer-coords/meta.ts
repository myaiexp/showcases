// leaflet example: GridLayer with div tiles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GridLayer with div tiles",
  summary:
    "A GridLayer subclass whose createTile() returns a div printing the tile's x, y and z with a red outline. A select changes tileSize, including a non-square Point(300, 120).",
  section: "Tile layers",
  tags: ["GridLayer", "createTile", "tileSize", "Point"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/docs/examples/extending-2-layers/index.md", "repo/src/layer/tile/GridLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
