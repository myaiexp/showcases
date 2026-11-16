// fabric example: Groups: a group of loaded images
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Groups: a group of loaded images',
  summary:
    'Images have to be loaded before they join a Group. Promise.all over FabricImage.fromURL waits for every picture, then one new Group moves, rotates and draws them together.',
  section: 'Groups',
  tags: ['Group', 'FabricImage', 'fromURL', 'Promise.all', 'rotate'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/Group.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
