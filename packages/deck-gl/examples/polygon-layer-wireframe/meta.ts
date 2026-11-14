// deck-gl example: PolygonLayer wireframe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PolygonLayer wireframe',
  summary:
    'wireframe draws the edges of extruded polygons as thin lines; because wireframe and solid extrusions are exclusive in one layer, a combined look takes two layers on the same data.',
  section: 'Core layers',
  tags: ['PolygonLayer', 'wireframe', 'extruded', 'getLineColor'],
  docs: [
    'repo/docs/api-reference/layers/polygon-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
