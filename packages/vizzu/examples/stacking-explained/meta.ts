// Vizzu example: the docs' own D, M, i data walking through dimension-only, measure and dimension, measure-only
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'How stacking works',
  summary:
    'Three records (A, B, C) and a constant i = 1. With only dimensions on x, they split the axis into equal sections. Swapping i for the measure M makes each section as wide as its value. Dropping the dimension leaves one bar from the origin whose pieces are stacked.',
  section: 'Stacking explanation',
  tags: ['stacking', 'range', 'markerGuides', 'dimension', 'measure'],
  docs: [
    'repo/docs/tutorial/stacking_explanation.md',
    'repo/docs/tutorial/stacking_explanation/01_a.js',
    'repo/docs/tutorial/stacking_explanation/01_b.js',
    'repo/docs/tutorial/stacking_explanation/01_c.js',
    'repo/docs/tutorial/stacking_explanation/01_d.js',
    'repo/docs/tutorial/stacking_explanation/data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
