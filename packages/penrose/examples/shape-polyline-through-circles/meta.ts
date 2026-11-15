// penrose example: Polyline through circle centres
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polyline through circle centres',
  summary:
    'Four small circles are free to move, and a Polyline takes their `center` values as its `points`, so the path redraws itself through them as the optimizer spreads them out. The circles are ordered left to right by `ensure` statements.',
  section: 'Shape: Polyline',
  tags: ['Polyline', 'points', 'center', 'Circle', 'rightwards'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/polyline.md', 'repo/packages/core/src/shapes/Polyline.ts', 'repo/packages/core/src/shapes/Circle.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
