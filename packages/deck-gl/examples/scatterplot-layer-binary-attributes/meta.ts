// deck-gl example: ScatterplotLayer binary attributes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScatterplotLayer binary attributes',
  summary:
    'Tens of thousands of circles supplied as typed arrays in data.attributes (positions, radii and colours) so the layer skips per-object accessors entirely.',
  section: 'Core layers',
  tags: ['ScatterplotLayer', 'data.attributes', 'binary', 'Float32Array'],
  docs: [
    'repo/docs/api-reference/layers/scatterplot-layer.md',
    'repo/docs/developer-guide/performance.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
