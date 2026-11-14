// g6 example: Focus element: animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Focus element: animation',
  summary: 'animation sets the duration and easing of the move to the focused element; a duration of 0 jumps at once. The card focuses distant nodes with slow and fast moves.',
  section: 'Behavior',
  tags: ['focus-element', 'animation', 'duration', 'easing', 'updateBehavior'],
  docs: ['repo/packages/site/docs/manual/behavior/FocusElement.en.md', 'repo/packages/site/common/api/behaviors/focus-element.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
