// leaflet example: Tile layer events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tile layer events",
  summary:
    "A tile layer's events counted live: tileloadstart, tileload, tileerror, tileabort and tileunload, with loading and load logged. A button zooms to 19, where the server has no tiles, so tileerror fires.",
  section: "Tile layers",
  tags: ["TileLayer", "tileloadstart", "tileload", "tileerror", "tileabort", "tileunload", "loading", "load", "isLoading"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ['repo/src/layer/tile/GridLayer.js', 'repo/src/layer/tile/TileLayer.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
