// embedding-atlas example: reset() and reset('random') on a running UMAP
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP reset to epoch 0",
  summary:
    "A running layout jumps back to epoch 0 when reset() restores the spectral start or reset('random') scatters the points, then it settles again. The status line shows the method of the last reset and the epoch counter.",
  section: "UMAP",
  tags: ['reset','step','epoch','embedding','createUMAP'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
