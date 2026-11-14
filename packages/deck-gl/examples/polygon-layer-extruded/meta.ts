// deck-gl example: PolygonLayer extruded
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PolygonLayer extruded',
  summary:
    'Turning flat blocks into towers with extruded and getElevation, then rescaling every height at once with elevationScale instead of touching the data.',
  section: 'Core layers',
  tags: ['PolygonLayer', 'extruded', 'getElevation', 'elevationScale', 'material'],
  docs: [
    'repo/docs/api-reference/layers/polygon-layer.md',
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
