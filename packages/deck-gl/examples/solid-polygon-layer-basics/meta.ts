// deck-gl example: SolidPolygonLayer basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SolidPolygonLayer basics',
  summary:
    'The filled-polygon primitive behind PolygonLayer: getPolygon and getFillColor only, with the second ring of each polygon cutting a hole. It never draws outlines.',
  section: 'Core layers',
  tags: ['SolidPolygonLayer', 'getPolygon', 'getFillColor', 'filled'],
  docs: [
    'repo/docs/api-reference/layers/solid-polygon-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
