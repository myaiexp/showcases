// embedding-atlas example: knnIndices and knnDistances drawn as links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP neighbour graph from knnIndices",
  summary:
    "Lines join each point to its nearest neighbours in the input space, read from knnIndices on the UMAP instance, over the layout as it settles. A slider chooses how many neighbours per point to draw, and the mean of knnDistances is shown.",
  section: "UMAP",
  tags: ['knnIndices','knnDistances','nNeighbors','createUMAP','step'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
