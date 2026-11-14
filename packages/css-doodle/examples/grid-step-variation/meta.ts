// Start from a grid, step 4: make randomness intentional
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Step 4: make randomness intentional',
  summary:
    'The hue formula gives way to a three-colour palette: each cell picks a colour, a corner shape and a quarter-turn with @p, and a scale between .82 and 1 with @r. The choices vary but the small palette keeps the piece coherent.',
  section: 'Start from a grid',
  tags: ['@p', '@r', '@cycle', 'rotate', 'scale'],
  docs: ['pages/css-doodle-com/start-from-grid.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
