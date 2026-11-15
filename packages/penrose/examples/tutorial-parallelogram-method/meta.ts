// penrose example: Exercise: the parallelogram method
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Exercise: the parallelogram method',
  summary:
    'Exercise 3: the `addV` block gets two more `Line`s, dashed from the head of `v` to the head of `u` and from `w` to `u`. With the two input arrows from the shared origin they close a parallelogram whose diagonal is the sum.',
  section: 'Tutorial: Functions',
  tags: ['function', 'Line', 'strokeDasharray', 'override'],
  docs: ['repo/packages/docs-site/docs/tutorial/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
