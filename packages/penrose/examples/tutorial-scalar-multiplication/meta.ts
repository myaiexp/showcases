// penrose example: Exercise: scalar multiplication
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Exercise: scalar multiplication',
  summary:
    'Exercise 2: a new `Scalar` type, `function scale(Scalar, Vector) -> Vector`, and a scalar `a` whose value is `?` held between 2 and 5 by `inRange`. The result vector is `a` times `v`, so it always points the same way and is 2 to 5 times longer.',
  section: 'Tutorial: Functions',
  tags: ['function', 'type', 'inRange', 'override', '?'],
  docs: ['repo/packages/docs-site/docs/tutorial/functions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
