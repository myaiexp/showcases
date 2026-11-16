// fabric example: Groups: interactive groups select members
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Groups: interactive groups select members',
  summary:
    'A group with subTargetCheck and interactive set to true lets the pointer select and drag its members in place; the group re-fits around them. With interactive off, a click selects the whole group.',
  section: 'Groups',
  tags: ['Group', 'subTargetCheck', 'interactive', 'getActiveObject', 'parent'],
  docs: [
    'repo/src/content/docs/api/classes/Group.md',
    'repo/src/content/docs/api/interfaces/GroupOwnProps.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
