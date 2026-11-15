// penrose example: Unknown scalars and their starting value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Unknown scalars and their starting value',
  summary:
    'The expression `?` is a number the optimizer picks, starting from a random sample. Writing `?[30]` gives it a starting value, and with nothing else constraining the radius the circle stays at 30. The tabs start the radius at a random value, at 30 and at 90.',
  section: 'Style: Expressions',
  tags: ['unknown', '?', 'initial value', 'Circle'],
  docs: ['repo/packages/docs-site/docs/ref/style/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
