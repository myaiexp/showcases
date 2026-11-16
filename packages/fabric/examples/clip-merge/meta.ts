// fabric example: Clip paths: Combining inverted and normal clips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clip paths: Combining inverted and normal clips',
  summary:
    "An inverted circle and a normal rectangle can clip one image together. util.mergeClipPaths wraps them into a single clip (the rectangle minus the circle); nesting one clipPath in another intersects them.",
  section: 'Clip paths',
  tags: ['clipPath', 'inverted', 'mergeClipPaths', 'Circle', 'Rect'],
  docs: ['repo/src/content/docs/docs/Old docs/clippath-part4.mdx', 'repo/src/content/docs/docs/Old docs/clippath-part2.mdx', 'repo/src/content/docs/api/namespaces/util/functions/mergeClipPaths.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
