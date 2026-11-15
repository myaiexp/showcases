// embedding-atlas example: createNNDescent progress callback while building
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "NNDescent progress callback",
  summary:
    "The progress option gets a 0 to 1 fraction and a stage name as the index builds. A bar tracks the fraction and the log lists each stage as it begins.",
  section: "NNDescent",
  tags: ['createNNDescent','progress'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
