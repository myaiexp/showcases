// css-doodle example: Re-picking with @p()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Re-picking with @p()',
  summary:
    '@p() with no arguments picks again from the arguments of the previous @p, and @P() also skips the value picked just before it. The border, background and shape each draw their own value from one shared list.',
  section: 'Random',
  tags: ['@p', '@P', '@lp', 'p()'],
  docs: [
    'pages/css-doodle-com/reference/function-p.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
