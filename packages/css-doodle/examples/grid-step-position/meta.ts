// Start from a grid, step 2: let each cell know where it is
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Step 2: let each cell know where it is',
  summary:
    "css-doodle evaluates every declaration once per cell. @i is the cell's index from 1, so hsl(@i(*7), …) turns position into a hue, and @content: @i writes the index into each cell.",
  section: 'Start from a grid',
  tags: ['@i', '@content', 'hsl()'],
  docs: ['pages/css-doodle-com/start-from-grid.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
