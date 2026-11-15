// penrose example: Rules for symmetric predicates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rules for symmetric predicates',
  summary:
    'A symmetric predicate must be binary and both argument types must be the same. `symmetric predicate Bond(Atom, Atom)` is fine; `Bond(Atom, Oxygen)` and a three-argument version each fail with an error.',
  section: 'Domain',
  tags: ['symmetric', 'predicate', 'error'],
  docs: [
    'repo/packages/docs-site/docs/ref/domain/predicates.md',
    'repo/packages/docs-site/blog/new-language-features.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
