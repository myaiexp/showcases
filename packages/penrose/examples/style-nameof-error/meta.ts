// penrose example: nameof reports the Substance name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'nameof reports the Substance name',
  summary:
    'In `forall Set x where IsEmpty(x); IsNonEmpty(x)` the Style program can print the Substance name with `nameof x`. Set A is declared both empty and non-empty, so the diagram shows an error message that mentions A; the second tab removes the contradiction and only the circle remains.',
  section: 'Style: Expressions',
  tags: ['nameof', 'string', 'Text', 'predicate', 'error message'],
  docs: ['repo/packages/docs-site/docs/ref/style/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
