// css-doodle example: Easing with an expression in t
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Easing with an expression in t',
  summary:
    'An easing can be an expression in t that starts with a letter, such as t^2. Here the x position is linear and the y position is t squared, so 24 dots trace a parabola. 1-t would read as an operation, so it needs a leading letter.',
  section: 'Cell functions',
  tags: ['@iI', 'easing', '@place'],
  docs: [
    'pages/css-doodle-com/reference/function-ii.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
