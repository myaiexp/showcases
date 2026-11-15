// penrose example: Group clipPath with clip() and noClip()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group clipPath with clip() and noClip()',
  summary:
    'Six stripes live in one Group. With the default `noClip()` the whole stack shows; `clipPath : clip(hole)` keeps only what lies inside a circle or a rounded rectangle named `hole`, which is then a member of the group and is not drawn itself.',
  section: 'Shape: Group',
  tags: ['Group', 'clipPath', 'clip', 'noClip'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/group.md', 'repo/packages/core/src/shapes/Group.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
