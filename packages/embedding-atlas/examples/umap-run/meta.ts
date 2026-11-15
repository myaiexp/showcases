// embedding-atlas example: createUMAP, run() and embedding on 50-D clusters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'UMAP to completion',
  summary:
    'createUMAP(count, inputDim, outputDim, data) on three thousand 50-dimensional points in six clusters, drawn first at epoch 0 (the spectral initialisation) and again after run() anneals the layout to the end. The embedding comes back as one Float32Array of x, y pairs.',
  section: 'UMAP',
  tags: ['createUMAP', 'run', 'embedding', 'epoch', 'metric', 'seed', 'destroy'],
  docs: ['repo/packages/docs/algorithms.md', 'repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
