// l7 example: Raster tiles: minZoom and maxZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster tiles: minZoom and maxZoom',
  summary:
    'parser.minZoom and maxZoom bound the tile levels that are requested: the picture tiles here stop at level 4, so zooming further only magnifies them. The readout shows the level in use.',
  section: 'Tile Layer',
  tags: ['RasterLayer', 'type: \'rasterTile\'', 'minZoom', 'maxZoom', 'tileset', 'currentZoom'],
  docs: [
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
    'repo/site/docs/api/common/source/tile/method.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
