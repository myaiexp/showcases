// penrose example: floor, ceil and trunc on a number line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'floor, ceil and trunc on a number line',
  summary:
    'A sampled value sits on a number line. Below it the results of `floor`, `ceil` and `trunc` land on whole numbers, one row each; for a negative value `trunc` rounds towards zero while `floor` runs away from it, and `sign` shades the value dot. (`round` is left out: it throws "rounding not supported" on 3.3.1.)',
  section: 'Computation: Math',
  tags: ['floor', 'ceil', 'trunc', 'sign'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
