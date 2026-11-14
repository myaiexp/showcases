// deck-gl example: Incremental data: one layer per chunk
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Incremental data: one layer per chunk',
  summary:
    "Chunks of points arrive one by one. Appending to a single data array makes the layer recompute every point each time, while one layer per chunk with a stable id only computes the new chunk; a counter shows both costs.",
  section: 'Data and performance',
  tags: ['data', 'incremental loading', 'layer id', 'chunks', 'accessors'],
  docs: [
    'repo/docs/developer-guide/performance.md',
    'repo/docs/api-reference/core/layer.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
