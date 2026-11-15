// l7 example: Raster tiles: picture WMS
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster tiles: picture WMS',
  summary:
    'A WMS-style URL asks for a {bbox} instead of z/x/y. L7 fills the box in, the page\'s data protocol reads it back out of the URL, and tileSize and zoomOffset shape the requests.',
  section: 'Tutorial: Tile',
  tags: ['RasterLayer', 'type: \'rasterTile\'', 'WMS', 'bbox', 'tileSize', 'zoomOffset'],
  docs: [
    'repo/site/docs/tutorial/tile/raster_tile.en.md',
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
    'repo/site/docs/api/source/raster_tile.en.md',
    'repo/site/docs/api/scene.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
