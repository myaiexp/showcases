// css-doodle example: @lp(n) looks further back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '@lp(n) looks further back',
  summary:
    '@lp(2) is the pick before the last one: the stacks are shared by every pick call in the render. Here the border color is picked first, the border radius second, and the background reuses the color with @lp(2). @cell(random) overrides some cells.',
  section: 'Random',
  tags: ['@lp', '@lr', '@cell', 'random'],
  docs: [
    'pages/css-doodle-com/reference/function-lp.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
