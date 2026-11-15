// l7 example: Raster tiles: picture TMS
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster tiles: picture TMS',
  summary:
    'A RasterLayer with parser type \'rasterTile\' fetches {z}/{x}/{y} picture tiles. They come from a data protocol served by this page: each PNG is painted on a canvas and carries its own z/x/y.',
  section: 'Tutorial: Tile',
  tags: ['RasterLayer', 'type: \'rasterTile\'', 'updateStrategy', 'TMS', 'addProtocol'],
  docs: [
    'repo/site/docs/tutorial/tile/raster_tile.en.md',
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
    'repo/site/docs/api/scene.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
