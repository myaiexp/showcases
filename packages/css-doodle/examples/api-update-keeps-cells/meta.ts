// update() keeps the cells when the grid is unchanged, so transitions run
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'update() keeps cells, so transitions run',
  summary:
    'When the grid size and the cells\' content are unchanged, update() keeps the existing cell elements and only replaces the styles, so a transition in the code animates from the old values to the new. The left doodle redraws with the same grid and glides; the right one gets a different grid each time, is rebuilt, and jumps.',
  section: 'Element API',
  tags: ['update()', 'transition', '@grid'],
  docs: ['pages/css-doodle-com/reference/js-api-update.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
