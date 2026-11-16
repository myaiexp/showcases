// fabric example: Groups: getObjects, item, contains, forEachObject, size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Groups: getObjects, item, contains, forEachObject, size',
  summary:
    'A group answers the collection questions the canvas does: size(), item(i), getObjects() (optionally by type), contains() and forEachObject(). The buttons use them to dim members and take one out and back in.',
  section: 'Groups',
  tags: ['Group', 'getObjects', 'item', 'size', 'isEmpty', 'contains', 'forEachObject', 'insertAt', 'remove'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
