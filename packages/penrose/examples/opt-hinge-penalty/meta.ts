// penrose example: Hinge penalties with max and ifCond
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hinge penalties with max and ifCond',
  summary:
    'A pull toward x = 9 and a wall that costs nothing until x passes 3. The wall is a hinge, written as `max(0, x - 3)` or as `ifCond(gt(x, 3), x - 3, 0)`; both give the same curve, and the iterate overshoots a little and settles on the wall\'s slope. The toggle switches the spelling.',
  section: 'Optimization API',
  tags: ['max', 'ifCond', 'gt', 'squared', 'objective', 'run'],
  docs: [
    'repo/packages/docs-site/docs/ref/optimization-api.md',
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/core/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
