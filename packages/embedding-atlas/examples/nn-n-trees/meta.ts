// embedding-atlas example: createNNDescent nTrees against recall
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "NNDescent nTrees",
  summary:
    "Bars show how well queryByIndex agrees with brute-force neighbours as nTrees goes from 1 to 16 on 24-dimensional clusters, with the build time of each index.",
  section: "NNDescent",
  tags: ['createNNDescent','nTrees','queryByIndex','seed'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
