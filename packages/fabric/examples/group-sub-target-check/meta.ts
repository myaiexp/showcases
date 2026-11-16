// fabric example: Groups: subTargetCheck and sub targets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Groups: subTargetCheck and sub targets',
  summary:
    'With subTargetCheck true a group tells events which member lies under the pointer: mouse events carry the group as target and the member in subTargets.',
  section: 'Groups',
  tags: ['Group', 'subTargetCheck', 'subTargets', 'mouse:move', 'mouse:out'],
  docs: [
    'repo/src/content/docs/api/classes/Group.md',
    'repo/src/content/docs/api/interfaces/GroupOwnProps.md',
    'repo/src/content/docs/api/interfaces/TPointerEventInfo.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
