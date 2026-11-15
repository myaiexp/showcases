// leaflet example: noWrap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "noWrap",
  summary:
    "At zoom 0 or 1 a tile layer repeats the world sideways. A select switches to noWrap, which shows it once, and to noWrap with bounds over the whole world, which also stops tile requests outside it. The caption counts the requests.",
  section: "Tile layers",
  tags: ["TileLayer", "noWrap", "bounds"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/GridLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
