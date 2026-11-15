// penrose example: Edit Mode: scaling a sampled radius or size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edit Mode: scaling a sampled radius or size',
  summary:
    'Shapes whose radius or width and height are sampled can be scaled as well. `scaleVaryingValues` multiplies the grabbed values by the factors, the scaled inputs are pinned, and the rest re-solve. A slider scales the chosen shape in the full view; the card pulses one circle.',
  section: 'Interactivity',
  tags: ['scaleVaryingValues', 'scalableShapePaths', 'getScalingInfo', 'Edit Mode'],
  docs: [
    'repo/packages/docs-site/docs/ref/Interactivity.md',
    'repo/packages/core/src/utils/InteractionUtils.ts',
    'repo/packages/core/src/index.ts',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
