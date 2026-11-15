// css-doodle example: A random length, angle and opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A random length, angle and opacity',
  summary:
    '@r(40%, 100%) picks a random number in a range, with its unit carried to the result, separately for every cell. Here each line gets its own length, opacity and rotation, and a new seed redraws them.',
  section: 'Random',
  tags: ['@r', '@size', 'opacity', 'rotate'],
  docs: [
    'pages/css-doodle-com/reference/function-r.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
