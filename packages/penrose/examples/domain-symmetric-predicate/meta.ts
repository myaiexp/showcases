// penrose example: Symmetric predicates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Symmetric predicates',
  summary:
    'With `symmetric predicate Bond(Atom, Atom)`, Substance can write `Bond(O, H1)` and `Bond(H2, O)` in either order and one Style block `forall Oxygen o; Hydrogen h where Bond(o, h)` still finds both. The second tab drops `symmetric` and the reversed bond no longer matches.',
  section: 'Domain',
  tags: ['symmetric', 'predicate', 'subtype', 'where'],
  docs: ['repo/packages/docs-site/docs/ref/domain/predicates.md', 'repo/packages/docs-site/blog/new-language-features.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
