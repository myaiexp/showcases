// css-doodle example: Reusing a picked color with @lp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reusing a picked color with @lp',
  summary:
    '@lp is the last value picked by @p, @pn or @pd. The gradient picks a color, then fades through white and back to the same color with @lp, while @pd flips the angle.',
  section: 'Random',
  tags: ['@lp', '@p', '@pd', 'linear-gradient'],
  docs: [
    'pages/css-doodle-com/reference/function-lp.md',
    'pages/css-doodle-com/reference/function-p.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
