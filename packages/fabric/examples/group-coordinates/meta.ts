// fabric example: Groups: members sit around the group centre
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Groups: members sit around the group centre',
  summary:
    'Inside a Group a member\'s left and top are measured from the group centre and stay put when the group moves; getCenterPoint() gives where the member really is on the canvas.',
  section: 'Groups',
  tags: ['Group', 'left', 'top', 'getCenterPoint', 'rotate', 'object:moving'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/Group.md',
    'repo/src/content/docs/api/classes/Circle.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
