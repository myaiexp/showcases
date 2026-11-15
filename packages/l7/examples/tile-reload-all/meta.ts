// l7 example: Reload all tiles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reload all tiles',
  summary:
    'source.reloadAllTile() asks for every tile on screen again, for tiles whose data changed on the server. Each tile counts its loads, so a reload shows as a new colour and count.',
  section: 'Tile Layer',
  tags: ['reloadAllTile', 'getSource', 'RasterLayer', 'type: \'rasterTile\''],
  docs: [
    'repo/site/docs/api/common/source/tile/method.en.md',
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
