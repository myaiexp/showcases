// Start from a grid, step 5: direct attention with cell selectors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Step 5: direct attention with cell selectors',
  summary:
    'An @cell block applies only where its expression matches: x = y is one diagonal and, on a 7 × 7 grid, x + y = 8 is the other. Those cells become circles, so the two diagonals read as an X over the random tiles.',
  section: 'Start from a grid',
  tags: ['@cell', 'x', 'y', 'border-radius'],
  docs: ['pages/css-doodle-com/start-from-grid.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
