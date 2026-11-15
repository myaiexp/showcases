// penrose example: A random length the optimizer cannot change
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A random length the optimizer cannot change',
  summary:
    'The docs\' example: `L = random(...)` fixes the length of a vector, the angle is an unknown, and `encourage norm(v - p) == 0` rotates it towards `p`. When L is below the distance to `p` the arm points at it and falls short; when longer, it overshoots. Each variation draws a new length.',
  section: 'Random Sampling',
  tags: ['random', 'unknown', 'encourage', 'norm', 'Line'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/random-sampling.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
