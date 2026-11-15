// embedding-atlas example: createUMAP localConnectivity 0, 1 and 3
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP localConnectivity",
  summary:
    "The same overlapping clusters laid out with localConnectivity 0, 1 and 3. A select picks the value and the card cycles through them.",
  section: "UMAP",
  tags: ['createUMAP','localConnectivity','step','embedding'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
