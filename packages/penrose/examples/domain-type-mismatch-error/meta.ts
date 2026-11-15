// penrose example: When a type does not match
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'When a type does not match',
  summary:
    'An argument must match the declared type up to subtyping. `Bond(NA, H)` fails because `NA` is a `NotAnAtom`, and Penrose reports the type mismatch instead of drawing. The other tabs show the valid applications from the docs table.',
  section: 'Domain',
  tags: ['subtype', 'predicate', 'error', 'matching'],
  docs: ['repo/packages/docs-site/docs/ref/domain/types.md', 'repo/packages/docs-site/docs/ref/substance/statements.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
