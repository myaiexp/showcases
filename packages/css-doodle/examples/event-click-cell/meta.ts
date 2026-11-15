// click:cell: the clicked cell's position and element in the event detail
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'click:cell',
  summary:
    'Clicking a cell dispatches click:cell on the doodle, with the column, row and depth of the cell (from 1) and the cell element itself in event.detail. The handler paints that element with a hue from its position, as in the docs\' example; the card clicks random cells by itself.',
  section: 'Events',
  tags: ['click:cell', 'detail.x', 'detail.y', 'detail.element'],
  docs: ['pages/css-doodle-com/reference/event-click-cell.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
