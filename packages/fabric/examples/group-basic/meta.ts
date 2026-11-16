// fabric example: Groups: a labelled ellipse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Groups: a labelled ellipse',
  summary:
    'new Group([circle, text], { left, top, angle }) makes one object out of two: it is placed, rotated and dragged as a whole while item() still reaches the members to change their fill and text.',
  section: 'Groups',
  tags: ['Group', 'item', 'angle', 'Circle', 'FabricText'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/Group.md',
    'repo/src/content/docs/api/classes/Circle.md',
    'repo/src/content/docs/api/classes/FabricText.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
