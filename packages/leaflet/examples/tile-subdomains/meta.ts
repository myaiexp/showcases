// leaflet example: Tile subdomains
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tile subdomains",
  summary:
    "A select sets the subdomains option of a tile layer: the default 'abc', a single letter, or an array of two names. A tally counts the tile requests that went to each subdomain, since each tile takes the one at index |x + y| modulo the count.",
  section: "Tile layers",
  tags: ["TileLayer", "subdomains", "{s}", "tileloadstart"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ['repo/src/layer/tile/TileLayer.js', 'repo/src/layer/tile/GridLayer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
