// penrose example: Predicate aliasing: bond as bond
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Predicate aliasing: bond as bond',
  summary:
    'A predicate in a `where` clause can be given a name: `where Bond(a, b) as bond`. The line that belongs to the bond itself is then `bond.line`, owned by neither atom, and another block can restyle it through its own alias.',
  section: 'Domain',
  tags: ['as', 'alias', 'predicate', 'where', 'Line'],
  docs: ['repo/packages/docs-site/blog/new-language-features.md', 'repo/packages/docs-site/docs/ref/domain/predicates.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
