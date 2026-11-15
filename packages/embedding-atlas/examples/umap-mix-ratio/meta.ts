// embedding-atlas example: createUMAP mixRatio 0, 0.5 and 1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP mixRatio",
  summary:
    "The same overlapping clusters laid out with mixRatio 0, 0.5 and 1. A select picks the value and the card cycles through them.",
  section: "UMAP",
  tags: ['createUMAP','mixRatio','step','embedding'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
