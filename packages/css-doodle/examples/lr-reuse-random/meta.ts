// css-doodle example: Reusing a random value with @lr
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reusing a random value with @lr',
  summary:
    '@lr is the last value produced by @r, @ri or @R. @size: @r(30%, 90%) @lr gives each cell a square of random size instead of two unrelated numbers.',
  section: 'Random',
  tags: ['@lr', '@r', '@size'],
  docs: [
    'pages/css-doodle-com/reference/function-lp.md',
    'pages/css-doodle-com/reference/function-r.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
