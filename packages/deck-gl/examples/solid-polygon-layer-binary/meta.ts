// deck-gl example: SolidPolygonLayer binary attributes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SolidPolygonLayer binary attributes',
  summary:
    'A grid of blocks packed into typed arrays and passed through data.attributes with startIndices: positions, heights and colours all come from buffers, with no accessors and no normalization.',
  section: 'Core layers',
  tags: ['SolidPolygonLayer', 'data.attributes', 'startIndices', '_normalize', 'binary'],
  docs: [
    'repo/docs/api-reference/layers/solid-polygon-layer.md',
    'repo/docs/developer-guide/performance.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
