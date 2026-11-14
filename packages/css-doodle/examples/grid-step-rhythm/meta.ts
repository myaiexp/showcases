// Start from a grid, step 3: repeat a sequence of shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Step 3: repeat a sequence of shapes',
  summary:
    '@pn.cycle(100% 0 0 0) takes the four rotations of one corner radius and hands them out in turn, one per cell, so the coloured squares become quarter circles facing four ways in a repeating rhythm.',
  section: 'Start from a grid',
  tags: ['@pn', '@cycle', 'border-radius', 'composition'],
  docs: ['pages/css-doodle-com/start-from-grid.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
