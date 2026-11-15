// embedding-atlas example: repulsionStrength and negativeSampleRate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UMAP repulsion and negative sampling",
  summary:
    "Higher repulsionStrength pushes unrelated points further apart, so clusters separate and spread out; negativeSampleRate sets how many unrelated points each update pushes against. Two sliders change them live while the layout steps.",
  section: "UMAP",
  tags: ['setParameters','repulsionStrength','negativeSampleRate','step','createUMAP'],
  docs: ['repo/packages/docs/algorithms.md','repo/packages/umap/umap-wasm/index.d.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
