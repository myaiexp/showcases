// penrose example: A scalar fixed at 5
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A scalar fixed at 5',
  summary:
    'The first half of exercise 2: the scalar is the literal `5.0` instead of `?`, so the result is exactly five times the input vector, and the input is kept short enough for the result to fit.',
  section: 'Tutorial: Functions',
  tags: ['function', 'override', 'Scalar'],
  docs: ['repo/packages/docs-site/docs/tutorial/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
