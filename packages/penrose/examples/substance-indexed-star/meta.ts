// penrose example: Fixed object with an index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fixed object with an index',
  summary:
    'In `Edge(hub, n_i) for i in [1, 5]` the name `hub` has no underscore, so it is an ordinary object, while `n_i` is templated. Five edges fan out from one centre.',
  section: 'Substance',
  tags: ['indexed', 'predicate', 'template', 'for'],
  docs: ['repo/packages/docs-site/docs/ref/substance/indexed-statements.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
