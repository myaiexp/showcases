// embedding-atlas example: createUMAPFromKNN on a 20 by 20 grid lattice
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP from a hand-made lattice graph",
  summary:
    "A 20 by 20 grid of cells, each joined to its eight nearest cells, goes into createUMAPFromKNN as index and distance arrays. The tangled start relaxes into a square sheet, coloured by quadrant.",
  section: "UMAP",
  tags: ['createUMAPFromKNN','knnIndices','knnDistances','initializeMethod','reset','step'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
