// leaflet example: GridLayer with async tiles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GridLayer with async tiles",
  summary:
    "A GridLayer whose createTile(coords, done) finishes each div tile after a random delay, and passes an error to done() for one tile in seven. The log shows loading, tileerror and load, and a slider sets the longest delay.",
  section: "Tile layers",
  tags: ["GridLayer", "createTile", "done", "loading", "load", "tileerror", "isLoading"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/docs/examples/extending-2-layers/index.md", "repo/src/layer/tile/GridLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
