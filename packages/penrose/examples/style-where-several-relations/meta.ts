// penrose example: Several relations in one where clause
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Semicolons join relations in a where clause',
  summary:
    'The header `forall Set s where IsRed(s); IsBig(s)` lists two relations separated by a semicolon, and a set matches only when both hold. Of four sets, only the one that is both red and big gets the gold ring.',
  section: 'Style: Selectors',
  tags: ['where', 'predicate', 'relations', 'semicolon'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/selectors.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
