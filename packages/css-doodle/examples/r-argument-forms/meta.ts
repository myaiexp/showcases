// css-doodle example: The forms of @r and @ri
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The forms of @r and @ri',
  summary:
    '@r() is 0 to 1, @r(10) is 0 to 10 and @r(5, 10) is 5 to 10, with a unit carried along. @ri rounds to whole numbers, and @rand is an older name for @r. Each cell shows its own draw.',
  section: 'Random',
  tags: ['@r', '@ri', '@rand', 'bounds', 'units'],
  docs: [
    'pages/css-doodle-com/reference/function-r.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
