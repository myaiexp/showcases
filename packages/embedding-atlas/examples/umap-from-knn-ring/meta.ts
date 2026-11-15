// embedding-atlas example: createUMAPFromKNN on a ring of 160 nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP from a hand-made ring graph",
  summary:
    "createUMAPFromKNN takes only a neighbour graph, here each node joined to the two before and two after it round a loop, with no vectors at all. Starting from random positions, the layout settles into a circle.",
  section: "UMAP",
  tags: ['createUMAPFromKNN','knnIndices','knnDistances','initializeMethod','reset','step'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
