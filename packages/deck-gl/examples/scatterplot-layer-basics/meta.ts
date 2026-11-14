// deck-gl example: ScatterplotLayer basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScatterplotLayer basics',
  summary:
    'World cities as circles: getRadius in meters from population, getFillColor from the same value, a global radiusScale slider and a hover tooltip.',
  section: 'Core layers',
  tags: ['ScatterplotLayer', 'getPosition', 'getRadius', 'getFillColor', 'radiusScale', 'radiusMinPixels'],
  docs: [
    'repo/docs/api-reference/layers/scatterplot-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
