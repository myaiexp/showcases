// l7 example: Vector tiles: featureId
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector tiles: featureId',
  summary:
    'featureId names the tile property that identifies a feature, so hover highlight and selection treat a country cut across several tiles as one. Hover a country to light it up whole.',
  section: 'Tile Layer',
  tags: ['featureId', 'sourceLayer', 'active', 'select', 'type: \'mvt\'', 'PolygonLayer'],
  docs: [
    'repo/site/docs/api/tile/common/options.en.md',
    'repo/site/docs/api/tile/vector_tile_layer.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
