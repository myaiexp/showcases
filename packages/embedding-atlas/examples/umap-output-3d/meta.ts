// embedding-atlas example: createUMAP outputDim 3 as a rotating projection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP with outputDim 3",
  summary:
    "Passing 3 as outputDim makes embedding hold x, y, z triples. Eight clusters form in 3D while the example rotates the cloud about the vertical axis and projects it onto the canvas.",
  section: "UMAP",
  tags: ['createUMAP','outputDim','embedding','step'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
