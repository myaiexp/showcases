// d2 example: Aligning with invisible elements
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Aligning with invisible elements',
  summary:
    'Two grids have rows of different lengths. Adding two shapes of a class with `style.opacity: 0` pads the short row on its left so `a` lines up under `c`, and `label.near` moves the container label out of the connection\'s way.',
  section: 'Grid Diagrams',
  tags: ['grid-rows', 'classes', 'opacity', 'near'],
  docs: ['repo/docs/tour/grid-diagrams.md', 'repo/static/d2/grid-unaligned.d2', 'repo/static/d2/grid-aligned.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
