// embedding-atlas example: createUMAP nEpochs sets how long run() anneals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP nEpochs and run()",
  summary:
    "createUMAP with nEpochs 20, 100 and 500 followed by run(), which anneals the learning rate to zero over that many epochs. The caption shows the epoch run() ended at and the time it took.",
  section: "UMAP",
  tags: ['createUMAP','nEpochs','run','epoch'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
