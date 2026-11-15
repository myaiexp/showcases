// embedding-atlas example: createNNDescent seed reproducibility
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "NNDescent seed",
  summary:
    "A seed 1 index is compared with another seed 1 build and with seeds 2 and 3, using a single iteration so the random start shows. Bars give the share of neighbours that match.",
  section: "NNDescent",
  tags: ['createNNDescent','seed','treeInit','nIters','queryByIndex'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
