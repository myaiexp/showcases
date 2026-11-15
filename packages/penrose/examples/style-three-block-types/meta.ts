// penrose example: Namespace, selector and collector together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The three block types in one program',
  summary:
    'A Style program is built from three kinds of block. A `look` namespace holds constants, `forall` selectors draw every set and element, and a `collect` block groups the elements of each set so that a set grows with `numberof` its members. Resampling moves everything, but the bigger set always holds more elements.',
  section: 'Style: Namespaces',
  tags: ['namespace', 'forall', 'collect', 'numberof', 'overview'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/overview.md',
    'repo/packages/docs-site/docs/ref/style/collectors.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
