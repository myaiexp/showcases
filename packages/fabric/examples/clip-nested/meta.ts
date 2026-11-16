// fabric example: Clip paths: Nested clip paths intersect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clip paths: Nested clip paths intersect',
  summary:
    "A clip path can have its own clipPath, which intersects the two shapes. Here a circle clipped by another circle clips a Group; the slider moves the inner one.",
  section: 'Clip paths',
  tags: ['clipPath', 'Circle', 'Group'],
  docs: ['repo/src/content/docs/docs/Old docs/clippath-part2.mdx', 'repo/src/content/docs/docs/Old docs/clippath-part2.jsx', 'repo/src/content/docs/api/classes/Circle.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
