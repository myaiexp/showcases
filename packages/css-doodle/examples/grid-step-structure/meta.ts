// Start from a grid, step 1: make the grid visible
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Step 1: make the grid visible',
  summary:
    '@grid makes a 7 × 7 grid, the value after the second slash paints the canvas behind the cells, and _ 2px adds a gap; plain CSS gives every cell a light background. One number makes a square grid, two set columns and rows, so the card switches to 4x8.',
  section: 'Start from a grid',
  tags: ['@grid', '_ gap', 'background'],
  docs: ['pages/css-doodle-com/start-from-grid.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
