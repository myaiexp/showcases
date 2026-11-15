// penrose example: Pinned shapes stay where you put them
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pinned shapes stay where you put them',
  summary:
    'Once translated, a shape is pinned: its inputs are masked out of the optimizer (`inputMask` false), and a red box marks it. The others keep optimizing around it. Right-click a shape in the full view, or use the button, to unpin; the card drags two circles, then releases them.',
  section: 'Interactivity',
  tags: ['inputMask', 'constraintSets', 'start', 'pin', 'Edit Mode', 'translateVaryingValues'],
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
