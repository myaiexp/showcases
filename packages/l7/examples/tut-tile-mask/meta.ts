// l7 example: Tile layer mask fence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tile layer mask fence',
  summary:
    'mask: true with maskfence (a GeoJSON polygon) clips a tile layer to the fence, here a data raster of elevation tiles cut to a disc.',
  section: 'Tutorial: Tile',
  tags: ['RasterLayer', 'mask', 'maskfence', 'type: \'rasterTile\'', 'dataType: \'arraybuffer\''],
  docs: [
    'repo/site/docs/tutorial/tile/tile.en.md',
    'repo/site/docs/tutorial/tile/raster_tile.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
