// deck-gl example: Hiding a layer: visible versus removing it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hiding a layer: visible versus removing it',
  summary:
    "Toggling a layer off by dropping it from the list throws away its buffers, so turning it back on calls the accessors for every point again. The visible prop keeps them, which the call counter shows.",
  section: 'Data and performance',
  tags: ['visible', 'layers', 'performance', 'accessors', 'buffers'],
  docs: [
    'repo/docs/developer-guide/performance.md',
    'repo/docs/api-reference/core/layer.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
