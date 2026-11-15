// penrose example: Polygon scale is about the page corner
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polygon scale is about the page corner',
  summary:
    'A fixed square next to its faint outline. `scale : 0.5` halves its size, but the SVG scales about the top-left corner of the diagram, so the square also slides towards that corner. Scale is not a way to resize a Polygon in place.',
  section: 'Shape: Polygon',
  tags: ['Polygon', 'scale', 'points', 'trap'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/polygon.md', 'repo/packages/core/src/shapes/Polygon.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
