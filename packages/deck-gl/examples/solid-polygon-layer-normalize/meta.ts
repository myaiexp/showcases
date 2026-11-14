// deck-gl example: SolidPolygonLayer _normalize and _windingOrder
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SolidPolygonLayer _normalize and _windingOrder',
  summary:
    'Flat typed-array rings drawn with _normalize false, which skips validation, and a _windingOrder switch that shows what a wrong winding does to extruded surfaces and lighting.',
  section: 'Core layers',
  tags: ['SolidPolygonLayer', '_normalize', '_windingOrder', 'positionFormat'],
  docs: [
    'repo/docs/api-reference/layers/solid-polygon-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
