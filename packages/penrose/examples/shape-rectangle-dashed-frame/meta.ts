// penrose example: Rectangle dashed frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rectangle dashed frame',
  summary:
    'A big Rectangle with `fillColor : none()` and `strokeStyle : "dashed"` frames a small filled one, which `contains` keeps inside it. The tabs swap the dash style for a custom `strokeDasharray`.',
  section: 'Shape: Rectangle',
  tags: ['Rectangle', 'strokeStyle', 'strokeDasharray', 'fillColor', 'contains'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/rectangle.md', 'repo/packages/core/src/shapes/Rectangle.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
