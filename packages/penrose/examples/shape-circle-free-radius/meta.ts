// penrose example: Circle with an optimized radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Circle with an optimized radius',
  summary:
    'The circles never get an `r`, so Penrose samples one and the optimizer is free to change it. `ensure t.icon.r > 25` and `< 70` keep it sane, and an `encourage` for equal radii makes the four circles end up the same size, whichever variation is drawn.',
  section: 'Shape: Circle',
  tags: ['Circle', 'r', 'ensure', 'encourage', 'default'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/circle.md',
    'repo/packages/core/src/shapes/Circle.ts',
    'repo/packages/core/src/shapes/Samplers.ts',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
