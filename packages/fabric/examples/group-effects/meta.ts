// fabric example: Groups: opacity, shadow and clipPath on a group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Groups: opacity, shadow and clipPath on a group',
  summary:
    'opacity, shadow and clipPath set on a Group act on its members as one picture: the pair fades together, shares one shadow and is cut by one clip shape.',
  section: 'Groups',
  tags: ['Group', 'opacity', 'shadow', 'Shadow', 'clipPath', 'dirty'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/Group.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
