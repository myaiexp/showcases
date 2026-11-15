// l7 example: Vector tiles: points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector tiles: points',
  summary:
    'A PointLayer on an mvt source draws the point features of one source layer of each tile. Towns are encoded into the tiles in code; sourceLayer picks them.',
  section: 'Tutorial: Tile',
  tags: ['PointLayer', 'type: \'mvt\'', 'sourceLayer', 'featureId'],
  docs: [
    'repo/site/docs/tutorial/tile/vector_tile.en.md',
    'repo/site/docs/api/tile/vector_tile_layer.en.md',
    'repo/site/docs/api/tile/common/options.en.md',
    'repo/site/docs/api/scene.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
