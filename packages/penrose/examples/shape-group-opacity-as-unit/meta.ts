// penrose example: Group opacity fades members as one
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group opacity fades members as one',
  summary:
    'Three overlapping circles are each given `opacity : 0.5` on one tab, so their overlaps darken. On the other tab they sit in a Group with `opacity : 0.5` on the group, which fades the finished picture once and leaves the overlaps flat.',
  section: 'Shape: Group',
  tags: ['Group', 'opacity', 'shapes', 'passthrough'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/group.md', 'repo/packages/core/src/shapes/Group.ts', 'repo/packages/docs-site/docs/ref/style/passthrough.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
