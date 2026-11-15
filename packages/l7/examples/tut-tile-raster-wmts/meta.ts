// l7 example: Raster tiles: picture WMTS
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster tiles: picture WMTS',
  summary:
    'With wmtsOptions L7 builds a WMTS GetTile query (layer, tileMatrixset, format plus TILECOL, TILEROW, TILEMATRIX) from the base URL. The page\'s data protocol answers it from those keys.',
  section: 'Tutorial: Tile',
  tags: ['RasterLayer', 'type: \'rasterTile\'', 'WMTS', 'wmtsOptions', 'tileMatrixset'],
  docs: [
    'repo/site/docs/tutorial/tile/raster_tile.en.md',
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
    'repo/site/docs/api/source/raster_tile.en.md',
    'repo/site/docs/api/scene.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
