// penrose example: Unknown vector components
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Unknown vector components',
  summary:
    'A vector may hold unknowns: `(?, 0.0)` is a point pinned to the x-axis that only slides sideways, `(0.0, ?)` slides along the y-axis and `(?, ?)` is free. Two points keep 160 apart, and each tab shows where the optimizer can still move them.',
  section: 'Style: Vectors & Matrices',
  tags: ['vec2', 'unknown', '?', 'vector', 'axes'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
