// penrose example: forall, where and with clauses
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'where and with clauses in any order',
  summary:
    'Three headers that mean the same thing: both objects in `forall`, one object moved to `with`, and `with` written before `where`. The first clause must be `forall`, but `where` and `with` may come in either order, so all three tabs mark the same subset in blue.',
  section: 'Style: Selectors',
  tags: ['forall', 'where', 'with', 'header'],
  docs: ['repo/packages/docs-site/docs/ref/style/selectors.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
