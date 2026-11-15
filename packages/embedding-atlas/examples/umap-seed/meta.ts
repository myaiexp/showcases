// embedding-atlas example: createUMAP seed run twice and with another value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP seed reproducibility",
  summary:
    "Three instances run to completion from a random start on the same data (spectral initialisation ignores the seed): seed 1, seed 1 again and seed 2. The line under the panels gives the largest coordinate difference between the pairs.",
  section: "UMAP",
  tags: ['createUMAP','seed','run','embedding'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
