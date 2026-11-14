// deck-gl example: PathLayer binary data and _pathType
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PathLayer binary data and _pathType',
  summary:
    'Polygon outlines packed into typed arrays and handed over through data.attributes with startIndices; _pathType skips normalization and decides whether each path is open or closes into a loop.',
  section: 'Core layers',
  tags: ['PathLayer', 'data.attributes', 'startIndices', '_pathType', 'binary'],
  docs: [
    'repo/docs/api-reference/layers/path-layer.md',
    'repo/docs/developer-guide/performance.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
