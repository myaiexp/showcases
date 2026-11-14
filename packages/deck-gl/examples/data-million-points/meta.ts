// deck-gl example: A million points from binary attributes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A million points from binary attributes',
  summary:
    "One million ScatterplotLayer points built from Float32Array attributes with no accessors, and the once-a-second _onMetrics readout showing fps, attribute update time and GPU memory. A select drops the count to 10k or 100k; cards draw a few thousand.",
  section: 'Data and performance',
  tags: ['data.attributes', 'typed array', 'ScatterplotLayer', '_onMetrics', 'large data'],
  docs: [
    'repo/docs/developer-guide/performance.md',
    'repo/docs/api-reference/core/layer.md',
    'repo/docs/api-reference/core/deck.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
