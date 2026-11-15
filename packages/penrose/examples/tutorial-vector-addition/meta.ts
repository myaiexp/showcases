// penrose example: Vector addition with addV
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector addition with addV',
  summary:
    'Task 2: Domain adds `function addV(Vector, Vector) -> Vector`, Substance defines `Vector u := addV(v, w)`, and a Style block matching `u := addV(v,w)` overrides `u.shape.end` with `v.shape.end + w.shape.end - U.origin`. The arrow for `u` is now exactly the sum.',
  section: 'Tutorial: Functions',
  tags: ['function', ':=', 'override', 'where', 'addV'],
  docs: ['repo/packages/docs-site/docs/tutorial/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
