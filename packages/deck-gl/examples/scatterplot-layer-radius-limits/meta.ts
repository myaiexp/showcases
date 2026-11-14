// deck-gl example: ScatterplotLayer radius limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScatterplotLayer radius limits',
  summary:
    'Circles with a fixed 6 km radius clamped by radiusMinPixels and radiusMaxPixels: they stay visible when zoomed out and stop swelling when zoomed in.',
  section: 'Core layers',
  tags: ['ScatterplotLayer', 'radiusMinPixels', 'radiusMaxPixels', 'getRadius'],
  docs: [
    'repo/docs/api-reference/layers/scatterplot-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
