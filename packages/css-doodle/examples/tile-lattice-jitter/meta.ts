// css-doodle example: Jitter moves the corners
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Jitter moves the corners",
  summary:
    "jitter moves every corner of a lattice in a random direction by up to that part of a piece's size, and neighbours move the shared corner together so the pieces still fit. Above about .3 the pieces start to fold.",
  section: 'Shapes',
  tags: ['@tile', 'jitter', '@tile.grid', '@tile.hex'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
