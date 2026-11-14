// observable-plot example: Waffle: partial cells and rounding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waffle: partial cells and rounding',
  summary:
    'Fractional values fill a partial first or last cell. The round option removes them: true rounds to the nearest cell, Math.floor and Math.ceil round down or up.',
  section: 'Mark: Waffle',
  tags: ['waffleY', 'round', 'unit'],
  docs: ['repo/docs/marks/waffle.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
