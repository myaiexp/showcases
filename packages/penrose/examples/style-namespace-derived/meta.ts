// penrose example: Namespaces from namespaces
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Namespaces that build on each other',
  summary:
    'One namespace derives its values from another (`sizes.big = base.unit * 3`), a namespace can hold an unknown `?` that the optimizer fills in (`gap.d`), and a namespace can even hold a shape, the frame. Every block reads them with the dot operator.',
  section: 'Style: Namespaces',
  tags: ['namespace', 'global variables', 'unknown', 'Rectangle'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/namespaces.md',
    'repo/packages/docs-site/docs/ref/style/expressions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
