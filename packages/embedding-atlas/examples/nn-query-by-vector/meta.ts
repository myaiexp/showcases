// embedding-atlas example: queryByVector with a moving query point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "NNDescent query by vector",
  summary:
    "A query point that is not in the data moves over the plot, and queryByVector(vector, k) finds the k data points closest to it at every frame. In the full view the pointer is the query; the card follows a looping path.",
  section: "NNDescent",
  tags: ['createNNDescent','queryByVector','seed','destroy'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
