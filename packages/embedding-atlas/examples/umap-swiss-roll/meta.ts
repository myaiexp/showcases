// embedding-atlas example: createUMAP on a Swiss roll padded to 10 dimensions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP unrolls a Swiss roll",
  summary:
    "The left panel shows the input rolled up as a spiral; the right shows what createUMAP makes of it as the layout steps from random positions, patches that keep the colours in order along the roll's length.",
  section: "UMAP",
  tags: ['createUMAP','nNeighbors','initializeMethod','step','reset'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
