// l7 example: Raster tiles: tileSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster tiles: tileSize',
  summary:
    'parser.tileSize must equal the size of the pictures the service returns. With 128, 256 or 512 px tiles all matching, the tile grid is the same but each request covers a different pixel count.',
  section: 'Tile Layer',
  tags: ['RasterLayer', 'type: \'rasterTile\'', 'tileSize'],
  docs: [
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
    'repo/site/docs/api/source/raster_tile.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
