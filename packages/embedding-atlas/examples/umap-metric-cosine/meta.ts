// embedding-atlas example: createUMAP metric option on rows with random lengths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP metric: euclidean vs cosine",
  summary:
    "The same six directions, with every row scaled to a random length, laid out twice. The euclidean panel smears each cluster along its length; the cosine panel, set with metric: 'cosine', groups by direction only.",
  section: "UMAP",
  tags: ['createUMAP','metric','cosine','euclidean','step'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
