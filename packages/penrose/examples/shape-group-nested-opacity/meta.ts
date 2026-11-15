// penrose example: Nested Groups
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nested Groups',
  summary:
    'The docs build `g` from a circle, a rectangle and a text, then `g2` from another circle and `g`. A group draws as an SVG `<g>`, so a passthrough `opacity` on the inner group, the outer one or both fades exactly the shapes under it.',
  section: 'Shape: Group',
  tags: ['Group', 'shapes', 'opacity', 'passthrough'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/group.md', 'repo/packages/core/src/shapes/Group.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
