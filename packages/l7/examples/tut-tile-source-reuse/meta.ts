// l7 example: One tile source, three layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One tile source, three layers',
  summary:
    'Several layers can read the same Source object, so the tiles load once. One mvt source feeds a polygon fill, a border line and town labels, each naming its own sourceLayer.',
  section: 'Tutorial: Tile',
  tags: ['Source', 'PolygonLayer', 'LineLayer', 'PointLayer', 'sourceLayer', 'featureId', 'shape(\'text\')'],
  docs: [
    'repo/site/docs/tutorial/tile/tile.en.md',
    'repo/site/docs/api/tile/vector_tile_layer.en.md',
    'repo/site/docs/api/tile/common/options.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
