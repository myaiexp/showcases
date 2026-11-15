// l7 example: Vector tiles: mask layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector tiles: mask layer',
  summary:
    'A MaskLayer on an mvt source cuts a raster layer to the shapes in the vector tiles. Here picture tiles show only inside the countries.',
  section: 'Tutorial: Tile',
  tags: ['MaskLayer', 'RasterLayer', 'type: \'mvt\'', 'sourceLayer', 'maskLayers'],
  docs: [
    'repo/site/docs/tutorial/tile/vector_tile.en.md',
    'repo/site/docs/api/tile/vector_tile_layer.en.md',
    'repo/site/docs/api/tile/common/options.en.md',
    'repo/site/docs/api/common/layer/mask_options.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
