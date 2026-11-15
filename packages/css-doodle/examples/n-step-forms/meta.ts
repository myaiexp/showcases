// css-doodle example: The step: @n, @N and operations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The step: @n, @N and operations',
  summary:
    '@n is the current step counted from 1 and @N the number of steps. Operations work as for @i: @n(*10%), @N(-@n, +1) for a backwards count. Outside a sequence the functions are left as written.',
  section: 'Sequence',
  tags: ['@n', '@N', '@m', 'operations'],
  docs: [
    'pages/css-doodle-com/reference/function-n.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
