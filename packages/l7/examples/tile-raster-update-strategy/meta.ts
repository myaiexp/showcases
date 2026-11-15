// l7 example: Raster tiles: updateStrategy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster tiles: updateStrategy',
  summary:
    'updateStrategy decides what shows while new tiles load: replace keeps the old level until the new one is ready, overlap draws both, realtime shows each tile as it arrives. Tiles answer after 600 ms; zoom to compare.',
  section: 'Tile Layer',
  tags: ['RasterLayer', 'type: \'rasterTile\'', 'updateStrategy', 'realtime', 'overlap', 'replace'],
  docs: [
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
    'repo/site/docs/api/source/raster_tile.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
