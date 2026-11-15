// leaflet example: Overriding getTileUrl and getAttribution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Overriding getTileUrl and getAttribution",
  summary:
    `The tutorial's extension method for tile layers: a TileLayer subclass that ignores its URL template and builds each tile's address from the tile coordinates in getTileUrl, here a different map style per tile in a chosen pattern, and returns its own text from getAttribution. The log shows the last tile requests with their coordinates and the style chosen.`,
  section: "Extending Leaflet",
  tags: ["TileLayer", "getTileUrl", "getAttribution", "redraw", "tileloadstart", "Coords"],
  docs: [
    'repo/docs/examples/extending-2-layers/index.md',
    'repo/src/layer/tile/TileLayer.js',
    'repo/src/layer/tile/GridLayer.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
