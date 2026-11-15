// penrose example: Group clipped to a sliding window
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group clipped to a sliding window',
  summary:
    'A giant word sits in a Group clipped by a narrow Rectangle whose centre is an unknown the optimizer pins to 0. As it solves, the window slides over the word and only the letters under it show. The clip shape is declared before the group, as the docs require.',
  section: 'Shape: Group',
  tags: ['Group', 'clipPath', 'clip', 'Text', 'Rectangle'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/group.md', 'repo/packages/core/src/shapes/Group.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
