// embedding-atlas example: createNNDescent nNeighbors 3, 15 and 60
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "NNDescent nNeighbors",
  summary:
    "Each index keeps nNeighbors neighbours per point, and queryByIndex shows that many around a chosen point. A select picks 3, 15 or 60; the card cycles and walks across points.",
  section: "NNDescent",
  tags: ['createNNDescent','nNeighbors','queryByIndex'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
