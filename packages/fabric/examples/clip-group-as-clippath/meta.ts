// fabric example: Clip paths: A group as the clip path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clip paths: A group as the clip path',
  summary: 'A Group of circles works as a single clipPath: the visible area is the union of all its objects. The sliders move two of the circles and re-run the group layout.',
  section: 'Clip paths',
  tags: ['clipPath', 'Group', 'Circle', 'triggerLayout'],
  docs: ['repo/src/content/docs/docs/Old docs/clippath-part1.mdx', 'repo/src/content/docs/docs/Old docs/clippath-part1/example3.js', 'repo/src/content/docs/api/classes/Group.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
