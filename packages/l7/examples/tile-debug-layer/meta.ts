// l7 example: Tile debug layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tile debug layer',
  summary:
    'TileDebugLayer needs no source: it draws the outline and the z/x/y of every tile the map needs at the current view, for checking a tile service.',
  section: 'Tile Layer',
  tags: ['TileDebugLayer'],
  docs: [
    'repo/site/docs/api/tile/tile_debug_layer.en.md',
    'repo/site/docs/api/tile/vector_tile_layer.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
