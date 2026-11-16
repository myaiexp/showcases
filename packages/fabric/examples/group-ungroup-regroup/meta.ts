// fabric example: Groups: ungroup and regroup a selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Groups: ungroup and regroup a selection',
  summary:
    'To group, take the active objects off the canvas and wrap them in new Group(objects). To ungroup, group.removeAll() returns the members with the group\'s transform applied, ready to add to the canvas again.',
  section: 'Groups',
  tags: ['Group', 'removeAll', 'ActiveSelection', 'getActiveObjects', 'setActiveObject', 'remove', 'add'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/docs/Old docs/v2-breaking-changes.md',
    'repo/src/content/docs/api/classes/Group.md',
    'repo/src/content/docs/api/classes/ActiveSelection.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
