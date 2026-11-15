// embedding-atlas example: setOptimizer switching a running layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP setOptimizer on the fly",
  summary:
    "One layout keeps stepping while setOptimizer swaps between sgd and momentum, which resets the velocity buffer. A select changes it in the full view; the card toggles every few seconds.",
  section: "UMAP",
  tags: ['setOptimizer','optimizer','momentum','sgd','step','createUMAP'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
