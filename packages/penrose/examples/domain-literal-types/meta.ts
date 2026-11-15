// penrose example: Number and String literal types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Number and String literal types',
  summary:
    '`Number` and `String` are built in, so `predicate Has(Set s, Number n)` needs no declaration of them. Substance passes literals such as `Has(S, 7)` and `Named(S, "primes")`, and Style matches the literal values it wants.',
  section: 'Domain',
  tags: ['Number', 'String', 'literal', 'predicate'],
  docs: ['repo/packages/docs-site/docs/ref/domain/types.md', 'repo/packages/docs-site/docs/ref/substance/literal-expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
