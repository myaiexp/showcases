// penrose example: Disjoint pairs of two
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Disjoint pairs of two',
  summary:
    'Boolean operators combine in a filter: `where i % 2 == 0 && j == i + 1` keeps only [0, 1] and [2, 3] of a four-node index range, so the graph is two separate edges. Spaces around `+` matter, as the tokenizer warning in the docs explains.',
  section: 'Substance',
  tags: ['indexed', 'where', '&&', 'predicate'],
  docs: [
    'repo/packages/docs-site/docs/ref/substance/indexed-statements.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
