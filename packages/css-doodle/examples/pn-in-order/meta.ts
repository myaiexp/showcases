// css-doodle example: Picking in order with @pn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Picking in order with @pn',
  summary:
    '@pn gives each cell the next argument and starts over at the end. Each call site keeps its own counter, so the pattern repeats along the reading order whatever the grid width.',
  section: 'Random',
  tags: ['@pn'],
  docs: [
    'pages/css-doodle-com/reference/function-pn.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
