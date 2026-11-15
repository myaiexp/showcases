// embedding-atlas example: createUMAP progress callback during setup and run()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP progress callback",
  summary:
    "The progress option receives a 0 to 1 fraction and a stage name while createUMAP builds the neighbour graph and while run() optimises. A bar tracks the fraction and the log lists each stage as it begins.",
  section: "UMAP",
  tags: ['createUMAP','progress','run'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
