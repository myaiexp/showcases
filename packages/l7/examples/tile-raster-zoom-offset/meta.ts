// l7 example: Raster tiles: zoomOffset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster tiles: zoomOffset',
  summary:
    'parser.zoomOffset shifts which tile level L7 requests for the current zoom. Each tile shows its z/x/y: +1 asks for the next, sharper level (more, smaller tiles), -1 for coarser ones.',
  section: 'Tile Layer',
  tags: ['RasterLayer', 'type: \'rasterTile\'', 'zoomOffset'],
  docs: [
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
    'repo/site/docs/api/source/raster_tile.en.md',
    'repo/site/docs/api/scene.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
