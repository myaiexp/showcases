// embedding-atlas example: setParameters learningRate with step()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP learning rate, live",
  summary:
    "The same layout started from random points moves faster or slower depending on learningRate, which step() applies flat with no decay. A slider changes it live; the card alternates a slow and a fast rate.",
  section: "UMAP",
  tags: ['setParameters','learningRate','step','reset','createUMAP'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
