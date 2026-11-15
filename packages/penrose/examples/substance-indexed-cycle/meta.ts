// penrose example: A cycle with mod
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A cycle with mod',
  summary:
    'The docs\' cyclic example, `where j == (i + 1) mod 5`, closes the path: n_4 is linked back to n_0. The tabs use mod 5 on five nodes and mod 6 on six, and each ring closes.',
  section: 'Substance',
  tags: ['indexed', 'where', 'mod', 'predicate'],
  docs: [
    'repo/packages/docs-site/docs/ref/substance/indexed-statements.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
