// d2 example: Globs: recursive with **
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Globs: recursive with **',
  summary:
    '`**` reaches into every nested level. The first tab rounds every shape at any depth; the second connects the shapes of a zone to a load balancer, skipping the container `machine B` because recursive connection globs only take leaves.',
  section: 'Globs',
  tags: ['globs', 'recursive', 'leaf'],
  docs: ['repo/docs/tour/globs.md', 'repo/static/d2/globs-recursive.d2', 'repo/static/d2/globs-recursive-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
