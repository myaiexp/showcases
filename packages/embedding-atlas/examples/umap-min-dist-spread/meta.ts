// embedding-atlas example: setParameters minDist and spread while stepping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP minDist and spread, live",
  summary:
    "Clusters tighten or loosen as setParameters({ minDist, spread }) re-fits UMAP's output curve between steps. Sliders drive both values in the full view; the card sweeps minDist back and forth.",
  section: "UMAP",
  tags: ['setParameters','minDist','spread','step','createUMAP'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
