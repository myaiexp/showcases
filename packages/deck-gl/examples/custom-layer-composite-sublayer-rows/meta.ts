// deck-gl example: getSubLayerRow and getSubLayerAccessor in an adapter composite layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Composite layer: getSubLayerRow and getSubLayerAccessor',
  summary:
    'A composite layer expands every station into one ring per ping, decorating each row with getSubLayerRow. The app\'s accessors, wrapped with getSubLayerAccessor, still receive the original station, and picking returns the station, not the ring row.',
  section: 'Custom layers',
  tags: ['CompositeLayer', 'getSubLayerRow', 'getSubLayerAccessor', 'adapter layer', 'updateState'],
  docs: [
    'repo/docs/developer-guide/custom-layers/composite-layers.md',
    'repo/docs/api-reference/core/composite-layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
