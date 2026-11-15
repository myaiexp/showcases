// l7 example: Reload one tile by z, x, y
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reload one tile by z, x, y',
  summary:
    'Reload a single tile by its z, x and y. The docs call it source.reloadTileById; on the Source of 2.29.1 the method is reloadTilebyId. Each press reloads the next tile on screen.',
  section: 'Tile Layer',
  tags: ['reloadTilebyId', 'reloadTileById', 'currentTiles', 'RasterLayer'],
  docs: [
    'repo/site/docs/api/common/source/tile/method.en.md',
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
