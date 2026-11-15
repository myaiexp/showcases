// embedding-atlas example: createNNDescent epsilon: accuracy vs speed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "NNDescent epsilon",
  summary:
    "epsilon trades accuracy for speed in queryByVector. Bars show recall against a brute-force search for epsilon 0 to 1, with the average time of one query.",
  section: "NNDescent",
  tags: ['createNNDescent','epsilon','queryByVector','seed'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
