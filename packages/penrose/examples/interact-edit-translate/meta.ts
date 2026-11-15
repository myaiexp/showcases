// penrose example: Edit Mode: drag a shape and the rest re-solve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edit Mode: drag a shape and the rest re-solve',
  summary:
    'Shapes with sampled centres can be translated. A drag writes the new centre into the input values with `translateVaryingValues`, holds those inputs out of the optimizer, and solves again, so the other circles make room. Drag in the full view; the card plays a drag itself.',
  section: 'Interactivity',
  tags: ['translateVaryingValues', 'getTranslatedInputsIdxs', 'interactivityInfo', 'getScreenToSvgPosition', 'Edit Mode'],
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
