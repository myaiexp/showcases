// penrose example: vals picks the start, and the minimum it finds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'vals picks the start, and the minimum it finds',
  summary:
    'One double-well objective, one `problem`, several `start({ vals })` calls. Where the optimizer begins decides which well it settles in, and its first long step can carry it across the hill, so the nearest well is not always the one it finds. In the full view a slider picks the starting x.',
  section: 'Optimization API',
  tags: ['vals', 'start', 'local minimum', 'pow', 'problem', 'run'],
  docs: [
    'repo/packages/docs-site/docs/ref/optimization-api.md',
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/core/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
