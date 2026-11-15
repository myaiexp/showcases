// l7 example: Vector tiles: lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector tiles: lines',
  summary:
    'A LineLayer on an mvt source draws line features: the border segments of the countries source layer, coloured by id.',
  section: 'Tutorial: Tile',
  tags: ['LineLayer', 'type: \'mvt\'', 'sourceLayer', 'featureId'],
  docs: [
    'repo/site/docs/tutorial/tile/vector_tile.en.md',
    'repo/site/docs/api/tile/vector_tile_layer.en.md',
    'repo/site/docs/api/tile/common/options.en.md',
    'repo/site/docs/api/scene.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
