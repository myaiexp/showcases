// css-doodle example: Offsets from the center: @dx and @dy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Offsets from the center: @dx and @dy',
  summary:
    '@dx and @dy measure each cell from the center of the grid in cells. On an odd grid the middle cell is 0; on an even grid the values are halves such as -1.5 and .5.',
  section: 'Cell functions',
  tags: ['@dx', '@dy', '@content'],
  docs: [
    'pages/css-doodle-com/reference/function-dx.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
