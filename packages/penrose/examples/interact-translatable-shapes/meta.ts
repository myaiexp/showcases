// penrose example: Which shapes can be dragged
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which shapes can be dragged',
  summary:
    'A shape is translatable only when every coordinate of its centre is a sampled value. Of the five circles from the docs, c1 to c3 qualify (green); c4 has a fixed y and c5 is offset from another centre, so there is no input for a drag to change (red). `interactivityInfo.translatableShapePaths` lists them.',
  section: 'Interactivity',
  tags: ['translatableShapePaths', 'interactivityInfo', 'sampled', 'Edit Mode', 'getAllInteractiveIdxs'],
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
