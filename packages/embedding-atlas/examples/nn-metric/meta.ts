// embedding-atlas example: createNNDescent metric option on the same point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "NNDescent metric: euclidean vs cosine",
  summary:
    "The same point's 30 neighbours under metric euclidean (a patch of the plane around it) and metric cosine (points along the same direction from the origin, near or far). Click either plot to choose another point.",
  section: "NNDescent",
  tags: ['createNNDescent','metric','cosine','euclidean','queryByIndex'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
