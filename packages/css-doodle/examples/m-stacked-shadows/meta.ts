// css-doodle example: Repeating a shadow with @m
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Repeating a shadow with @m',
  summary:
    '@m5(...) repeats its value five times joined by commas, and @n inside it is the step, so each copy of the shadow is offset 2px further than the last. @m<count>(...) is the short form of @m(count, ...).',
  section: 'Sequence',
  tags: ['@m', '@n', 'box-shadow'],
  docs: [
    'pages/css-doodle-com/reference/function-m.md',
    'pages/css-doodle-com/reference/function-n.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
