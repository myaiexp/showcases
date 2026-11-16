// fabric example: Groups: add, insertAt and remove
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Groups: add, insertAt and remove',
  summary:
    'group.add(), insertAt() and remove() change a group\'s members and the group re-fits its box around them, growing for an object far away and shrinking when it leaves.',
  section: 'Groups',
  tags: ['Group', 'add', 'insertAt', 'remove', 'size', 'getObjects'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/Group.md',
    'repo/src/content/docs/api/classes/LayoutManager.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
