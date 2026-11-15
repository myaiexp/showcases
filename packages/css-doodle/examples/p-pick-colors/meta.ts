// css-doodle example: Picking at random with @p
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Picking at random with @p',
  summary:
    '@p(...) picks one of its arguments at random, and every cell picks again. The picks follow the doodle’s seed, so a seed always draws the same picture.',
  section: 'Random',
  tags: ['@p', 'background'],
  docs: [
    'pages/css-doodle-com/reference/function-p.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
