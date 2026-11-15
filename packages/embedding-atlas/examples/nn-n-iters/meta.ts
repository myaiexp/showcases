// embedding-atlas example: createNNDescent nIters vs recall, treeInit off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "NNDescent nIters",
  summary:
    "With the random projection trees switched off, recall rests on the NN-descent iterations alone. Bars show queryByIndex recall against brute force for nIters 0, 1, 2, 3 and 6, with build times.",
  section: "NNDescent",
  tags: ['createNNDescent','nIters','treeInit','queryByIndex','seed'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
