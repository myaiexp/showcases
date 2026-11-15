// render: measure the doodle once its new styles and grid are in place
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Measuring after render',
  summary:
    'The render event is dispatched once the new styles are in place, after the first render and after every update, so the handler can measure the doodle. Here each update picks a grid of 4 to 9 columns of 20px cells, and the render handler reports the element\'s new size.',
  section: 'Events',
  tags: ['render', 'getBoundingClientRect', 'grid', '@size'],
  docs: ['pages/css-doodle-com/reference/event-render.md', 'pages/css-doodle-com/reference/js-api-grid.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
