// penrose example: Circle dashed outlines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Circle dashed outlines',
  summary:
    'Outlined circles whose stroke is solid, `strokeStyle : "dashed"` (the renderer\'s default dash), or a `strokeDasharray` such as `"2 8"` or `"14 4 2 4"`. The dasharray wins over strokeStyle when both are set.',
  section: 'Shape: Circle',
  tags: ['Circle', 'strokeStyle', 'strokeDasharray', 'strokeWidth'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/circle.md', 'repo/packages/core/src/shapes/Circle.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
