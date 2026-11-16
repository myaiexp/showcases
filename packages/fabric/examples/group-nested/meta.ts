// fabric example: Groups: nested groups
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Groups: nested groups',
  summary:
    'Groups nest: an inner Group is a member of an outer one, parent tells which group holds an object, isDescendantOf() and contains(obj, true) look through levels, and triggerLayout() re-fits the outer group after the inner one changed.',
  section: 'Groups',
  tags: ['Group', 'parent', 'isDescendantOf', 'contains', 'triggerLayout', 'interactive', 'subTargetCheck'],
  docs: [
    'repo/src/content/docs/api/classes/Group.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/api/classes/LayoutManager.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
