// fabric example: Layout managers: layout of an ActiveSelection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout managers: layout of an ActiveSelection',
  summary:
    'An ActiveSelection has its own layout manager. When the selected members belong to different interactive groups, moving the selection makes each parent group re-fit around what is left of it.',
  section: 'Layout managers',
  tags: ['ActiveSelection', 'LayoutManager', 'Group', 'parent', 'interactive', 'subTargetCheck', 'getActiveObjects'],
  docs: [
    'repo/src/content/docs/api/classes/ActiveSelection.md',
    'repo/src/content/docs/api/classes/LayoutManager.md',
    'repo/src/content/docs/api/classes/Group.md',
    'repo/CHANGELOG.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
