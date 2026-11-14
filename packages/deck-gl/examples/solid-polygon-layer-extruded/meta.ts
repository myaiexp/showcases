// deck-gl example: SolidPolygonLayer extruded
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SolidPolygonLayer extruded',
  summary:
    'Extruded blocks with getElevation, elevationScale and a material, plus a second wireframe layer on the same data because solid and wireframe extrusions are exclusive in one layer.',
  section: 'Core layers',
  tags: ['SolidPolygonLayer', 'extruded', 'getElevation', 'elevationScale', 'wireframe', 'material'],
  docs: [
    'repo/docs/api-reference/layers/solid-polygon-layer.md',
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
