// deck-gl example: several vertex shader hooks injected into a subclassed layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subclassed layer: vertex shader hooks',
  summary:
    "A ScatterplotLayer subclass injects into vs:#decl, vs:#main-start, vs:DECKGL_FILTER_SIZE and vs:DECKGL_FILTER_COLOR so a band sweeping across the longitudes enlarges and whitens the dots it passes. The band's position is a uniform written in draw().",
  section: 'Custom layers',
  tags: ['subclass', 'getShaders', 'inject', 'DECKGL_FILTER_SIZE', 'DECKGL_FILTER_COLOR', 'VertexGeometry', 'draw'],
  docs: [
    'repo/docs/developer-guide/custom-layers/writing-shaders.md',
    'repo/docs/developer-guide/custom-layers/subclassed-layers.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
