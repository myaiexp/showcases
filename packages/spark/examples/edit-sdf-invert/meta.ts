// Spark example: SplatEdit.invert compared with SplatEditSdf.invert
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edit invert',
  summary:
    'Three torus knots carry the same SET_RGB edit with a red and a blue sphere. The left one is the baseline. On the middle knot SplatEdit.invert swaps inside and outside for the whole edit, so the colour lands outside both spheres. On the right knot only the blue SplatEditSdf is inverted. Checkboxes toggle each flag; the card cycles them.',
  section: 'Splat Editing',
  tags: ['SplatEdit', 'SplatEditSdf', 'invert', 'SET_RGB', 'SPHERE'],
  docs: ['repo/docs/docs/splat-editing.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
