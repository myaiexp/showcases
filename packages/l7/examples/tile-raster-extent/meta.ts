// l7 example: Raster tiles: extent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster tiles: extent',
  summary:
    'parser.extent [minLng, maxLat, maxLng, minLat] limits which tiles are requested: with it on, only the tiles over the box exist; with it off the tiles cover the view.',
  section: 'Tile Layer',
  tags: ['RasterLayer', 'type: \'rasterTile\'', 'extent'],
  docs: [
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
    'repo/site/docs/api/source/raster_tile.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
