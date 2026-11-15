// css-doodle example: The half-likely bounds of @ri
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The half-likely bounds of @ri',
  summary:
    'Nine hundred cells each show @ri(1, 6). Because @ri rounds a continuous value, 1 and 6 each get half a unit of range while 2 to 5 get a whole one, so the counts under the grid show the ends about half as common.',
  section: 'Random',
  tags: ['@ri', 'bounds', 'distribution', 'render'],
  docs: [
    'pages/css-doodle-com/reference/function-r.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
