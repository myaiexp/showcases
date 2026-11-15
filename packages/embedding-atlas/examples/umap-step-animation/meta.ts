// embedding-atlas example: step() once per frame to animate a UMAP layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP stepped per frame",
  summary:
    "A random scatter of 50-dimensional points unfolds into six clusters as step(2) advances the layout two epochs per frame. The embedding property is read after each step and the epoch counter shows how far it has run; Restart calls reset('random').",
  section: "UMAP",
  tags: ['createUMAP','step','reset','embedding','epoch','initializeMethod'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
