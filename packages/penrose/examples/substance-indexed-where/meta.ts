// penrose example: Filtering with where: even indices
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filtering with where: even indices',
  summary:
    '`Node n_i for i in [0, 10] where i % 2 == 0` keeps only the even indices, so six nodes are declared instead of eleven. The second tab keeps the odd ones.',
  section: 'Substance',
  tags: ['indexed', 'where', '%', 'filter'],
  docs: ['repo/packages/docs-site/docs/ref/substance/indexed-statements.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
