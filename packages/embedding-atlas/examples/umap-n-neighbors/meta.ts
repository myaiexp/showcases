// embedding-atlas example: createUMAP nNeighbors 5, 15 and 50
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP nNeighbors",
  summary:
    "Overlapping clusters laid out with nNeighbors 5, 15 and 50. A small neighbourhood fragments clusters into islands; a large one keeps the global shape. A select picks the value, and the card cycles through them.",
  section: "UMAP",
  tags: ['createUMAP','nNeighbors','step','embedding'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
