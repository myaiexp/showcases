// penrose example: Indexed statements that go wrong
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Indexed statements that go wrong',
  summary:
    'Errors the docs list for indexed statements: `v_j` with only `i` ranged (`j` is undefined), an unbound second index, and redeclaring a name that already exists. Each tab breaks one rule.',
  section: 'Substance',
  tags: ['indexed', 'error', 'duplication', 'range'],
  docs: ['repo/packages/docs-site/docs/ref/substance/indexed-statements.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
