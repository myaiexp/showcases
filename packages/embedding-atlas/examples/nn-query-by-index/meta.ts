// embedding-atlas example: createNNDescent and queryByIndex on 2D points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "NNDescent neighbours of a point",
  summary:
    "Click a point and queryByIndex(i, k) lights up its k nearest neighbours with lines and white dots; the card walks from point to point on its own. A slider sets k, and the status line gives the farthest neighbour's distance.",
  section: "NNDescent",
  tags: ['createNNDescent','queryByIndex','nNeighbors','seed','destroy'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
