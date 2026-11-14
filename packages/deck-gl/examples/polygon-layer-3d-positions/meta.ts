// deck-gl example: PolygonLayer with 3D positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PolygonLayer with 3D positions',
  summary:
    'Rings whose vertices carry an altitude draw as tilted panels in space; with extruded on, getElevation is added to the altitude of each vertex.',
  section: 'Core layers',
  tags: ['PolygonLayer', 'getPolygon', 'XYZ', 'extruded', 'getElevation'],
  docs: [
    'repo/docs/api-reference/layers/polygon-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
