// css-doodle example: @P: no repeats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '@P: no repeats',
  summary:
    '@P skips the value it picked at the same place in the cell before, so neighbours in a one-dimensional grid always differ. The second column uses plain @p, where neighbours often match.',
  section: 'Random',
  tags: ['@P', '@p'],
  docs: [
    'pages/css-doodle-com/reference/function-p.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
