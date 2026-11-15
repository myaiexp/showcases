// l7 example: Reload the tile at a point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reload the tile at a point',
  summary:
    'source.reloadTileByLnglat(lng, lat, zoom) reloads the one tile that holds a point. Here it is the map centre, so panning changes which tile a press refreshes.',
  section: 'Tile Layer',
  tags: ['reloadTileByLnglat', 'getSource', 'RasterLayer'],
  docs: [
    'repo/site/docs/api/common/source/tile/method.en.md',
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
