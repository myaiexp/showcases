// penrose example: triangleRandom(a, b, c)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'triangleRandom(a, b, c)',
  summary:
    '`triangleRandom(a, b, c)` returns a point sampled uniformly from the triangle with those corners. Thirty dots land inside the drawn triangle and fill it evenly, and each variation scatters them again.',
  section: 'Random Sampling',
  tags: ['triangleRandom', 'Polygon', 'Circle', 'vector'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/random-sampling.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
