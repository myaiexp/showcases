// penrose example: Group layering moves members together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group layering moves members together',
  summary:
    'Two Groups of two overlapping circles cross each other. `g1 above g2` lifts both red circles over both blue ones, and so does `r1 above b1` written on a single member, because layering a member applies to its whole group.',
  section: 'Shape: Group',
  tags: ['Group', 'layer', 'above', 'below'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/group.md', 'repo/packages/core/src/shapes/Group.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
