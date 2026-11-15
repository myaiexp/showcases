// embedding-atlas example: createUMAP on a noisy 30-D loop, three noise levels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP recovers a ring",
  summary:
    "A circle hidden in 30 dimensions by a random rotation is laid out from random positions at noise 0.02, 0.15 and 0.4. Low noise gives a clean ring coloured by arc; high noise thickens and breaks it.",
  section: "UMAP",
  tags: ['createUMAP','initializeMethod','step','embedding'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
