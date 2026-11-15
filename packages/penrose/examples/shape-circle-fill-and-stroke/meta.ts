// penrose example: Circle fill and stroke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Circle fill and stroke',
  summary:
    'Three circles of radius 42 on three tabs: only `fillColor`, only `strokeColor` with `fillColor : none()`, and both with a thick `strokeWidth`. A Circle defaults to a sampled fill and no stroke, so each tab says what it wants.',
  section: 'Shape: Circle',
  tags: ['Circle', 'fillColor', 'strokeColor', 'strokeWidth', 'none'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/circle.md',
    'repo/packages/core/src/shapes/Circle.ts',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
