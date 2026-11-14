// deck-gl example: ScatterplotLayer radiusUnits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScatterplotLayer radiusUnits',
  summary:
    'radiusUnits switches getRadius between meters on the ground, common units of the projected world and screen pixels; zoom the map to see which circles grow with it.',
  section: 'Core layers',
  tags: ['ScatterplotLayer', 'radiusUnits', 'getRadius'],
  docs: [
    'repo/docs/api-reference/layers/scatterplot-layer.md',
    'repo/docs/developer-guide/coordinate-systems.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
