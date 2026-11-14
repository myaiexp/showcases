// deck-gl example: PolygonLayer holes and polygon formats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PolygonLayer holes and polygon formats',
  summary:
    'Polygons with holes written two ways: an array of rings in GeoJSON style, or one flat positions array with holeIndices and positionFormat XY. A select swaps the format on the same shapes.',
  section: 'Core layers',
  tags: ['PolygonLayer', 'getPolygon', 'holeIndices', 'positionFormat'],
  docs: [
    'repo/docs/api-reference/layers/polygon-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
