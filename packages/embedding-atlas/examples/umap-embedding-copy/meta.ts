// embedding-atlas example: holding umap.embedding versus copying it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP embedding is a reused buffer",
  summary:
    "Two references taken at epoch 0 and kept while the layout runs: the plain umap.embedding one keeps moving because the buffer is reused, while new Float32Array(umap.embedding) stays frozen at the start.",
  section: "UMAP",
  tags: ['embedding','epoch','step','reset','createUMAP'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
