// penrose example: AutoLabel for chosen objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AutoLabel for chosen objects',
  summary:
    'Besides `AutoLabel All`, a list of names labels just those objects: `AutoLabel A, C` gives A and C their names and leaves B unlabelled.',
  section: 'Substance',
  tags: ['AutoLabel', 'label'],
  docs: [
    'repo/packages/docs-site/docs/ref/substance/statements.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
