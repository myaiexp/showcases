// penrose example: Literal arguments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Literal arguments',
  summary:
    'Numbers (`1.234`, `2`, `-5.678`) and quoted strings are literal expressions of type `Number` and `String`. Two sets hold such facts, and Style prints each fact\'s value next to its set with the literal read back out through a `where` match.',
  section: 'Substance',
  tags: ['Number', 'String', 'literal', 'predicate'],
  docs: ['repo/packages/docs-site/docs/ref/substance/literal-expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
