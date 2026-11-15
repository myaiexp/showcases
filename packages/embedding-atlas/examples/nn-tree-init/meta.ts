// embedding-atlas example: createNNDescent treeInit on and off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "NNDescent treeInit",
  summary:
    "Starting from random projection trees (treeInit: true) against a random start (false), with a one-iteration and an eight-iteration variant of the latter. Bars show recall against brute force and build time.",
  section: "NNDescent",
  tags: ['createNNDescent','treeInit','nIters','queryByIndex','seed'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
