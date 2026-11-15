// l7 example: Vector tiles: polygons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector tiles: polygons',
  summary:
    'A PolygonLayer on an mvt source fills the countries source layer. The tiles are protobuf encoded in code, and the colour callback keeps each country one colour in every tile.',
  section: 'Tutorial: Tile',
  tags: ['PolygonLayer', 'type: \'mvt\'', 'sourceLayer', 'featureId'],
  docs: [
    'repo/site/docs/tutorial/tile/vector_tile.en.md',
    'repo/site/docs/api/tile/vector_tile_layer.en.md',
    'repo/site/docs/api/tile/common/options.en.md',
    'repo/site/docs/api/scene.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
