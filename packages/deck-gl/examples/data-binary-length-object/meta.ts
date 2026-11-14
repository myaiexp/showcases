// deck-gl example: Binary blob as the data prop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Binary blob as the data prop',
  summary:
    "A flat Float32Array wrapped as {src, length} is the data prop: no per-point objects exist, and each accessor slices the array by index, writing into the pre-allocated target where it can. 50,000 points in a swirling cloud.",
  section: 'Data and performance',
  tags: ['data', 'length', 'typed array', 'index', 'target', 'accessors', 'binary data'],
  docs: [
    'repo/docs/developer-guide/performance.md',
    'repo/docs/api-reference/core/layer.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
