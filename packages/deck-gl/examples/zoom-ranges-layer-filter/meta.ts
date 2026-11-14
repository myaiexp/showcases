// deck-gl example: Zoom ranges with layerFilter or visible
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom ranges with layerFilter or visible',
  summary:
    "A coarse summary layer shows below zoom 9 and a point layer from zoom 9 up. Choose how the range is applied: Deck's layerFilter, which decides per viewport, or the layer's own visible prop, which keeps buffers alive.",
  section: 'Data and performance',
  tags: ['layerFilter', 'visible', 'minzoom', 'maxzoom', 'zoom ranges'],
  docs: [
    'repo/docs/developer-guide/zoom-dependent-layers.md',
    'repo/docs/api-reference/core/deck.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
