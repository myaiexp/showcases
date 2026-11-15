// penrose example: A list of shapes groups them
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A list of shapes groups them',
  summary:
    'A list of shapes, such as `[x.icon, y.icon]`, is a value too. Each `Pair(x, y)` wraps its two circles in a `Group` that belongs to the aliased predicate, and one constraint between the groups keeps every pair of circles away from every other pair.',
  section: 'Style: Expressions',
  tags: ['value types', 'list of shapes', 'Group', 'alias', 'disjoint'],
  docs: ['repo/packages/docs-site/docs/ref/style/value-types.md', 'repo/packages/docs-site/docs/ref/style/selectors.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
