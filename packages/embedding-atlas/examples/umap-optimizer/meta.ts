// embedding-atlas example: createUMAP optimizer sgd vs momentum
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP optimizer: sgd vs momentum",
  summary:
    "Eight clusters laid out from the same random start by the default sgd optimizer and by optimizer: 'momentum', which the docs say gives better global structure. Both step side by side with their epoch counters.",
  section: "UMAP",
  tags: ['createUMAP','optimizer','momentum','sgd','initializeMethod','step'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
