// embedding-atlas example: createNNDescent delta threshold vs recall
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "NNDescent delta",
  summary:
    "delta stops NN-descent once few neighbour lists still change. With the trees off, bars show recall against brute force for delta 0.2, 0.05, 0.001 and 0, with build times.",
  section: "NNDescent",
  tags: ['createNNDescent','delta','treeInit','queryByIndex','seed'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
