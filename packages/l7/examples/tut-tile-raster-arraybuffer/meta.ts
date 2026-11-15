// l7 example: Raster tiles: data raster
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster tiles: data raster',
  summary:
    'dataType \'arraybuffer\' turns tiles into numbers: each tile is 64 x 64 elevation values, the parser\'s format() reads them, and domain plus rampColors colour them like a single-band raster.',
  section: 'Tutorial: Tile',
  tags: ['RasterLayer', 'type: \'rasterTile\'', 'dataType: \'arraybuffer\'', 'format', 'domain', 'rampColors'],
  docs: [
    'repo/site/docs/tutorial/tile/raster_tile.en.md',
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
    'repo/site/docs/api/tile/common/style.en.md',
    'repo/site/docs/api/scene.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
