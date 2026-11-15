// penrose example: Literals cannot be declared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Literals cannot be declared',
  summary:
    'Objects of type `Number` and `String` only exist as literal expressions. `Number n` or `String s` as a declaration is an error, and Penrose reports it instead of drawing.',
  section: 'Substance',
  tags: ['Number', 'String', 'literal', 'error', 'declaration'],
  docs: ['repo/packages/docs-site/docs/ref/substance/literal-expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
