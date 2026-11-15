// penrose example: Play Mode: draggingConstraint confines a drag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Play Mode: draggingConstraint confines a drag',
  summary:
    'In Play Mode only shapes with a `draggingConstraint` string move. The string is a function body from the mouse position (x, y) to the allowed position: one circle goes anywhere, one is projected into the top-right quadrant with `Math.max`, one rides a horizontal rail. The card drags each one far past its limit.',
  section: 'Interactivity',
  tags: ['draggingConstraint', 'Play Mode', 'interactivityInfo', 'translateVaryingValues'],
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
