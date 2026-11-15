// embedding-atlas example: createUMAP initializeMethod spectral vs random
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP initializeMethod: spectral vs random",
  summary:
    "Two instances over the same data start from different layouts: spectral begins at epoch 0 already grouped, random begins as noise. Both step to the same kind of result; Restart calls reset on each with its own method.",
  section: "UMAP",
  tags: ['createUMAP','initializeMethod','spectral','random','reset','step'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
