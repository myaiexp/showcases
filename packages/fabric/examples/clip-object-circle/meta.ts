// fabric example: Clip paths: A circle clips a rectangle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clip paths: A circle clips a rectangle',
  summary:
    'Assigning a Circle to rect.clipPath leaves only the part of the rectangle inside the circle visible. The clip path is positioned from the object\'s centre; sliders move and resize it.',
  section: 'Clip paths',
  tags: ['clipPath', 'Circle', 'Rect', 'dirty'],
  docs: ['repo/src/content/docs/docs/Old docs/clippath-part1.mdx', 'repo/src/content/docs/docs/Old docs/clippath-part1/example1.js', 'repo/src/content/docs/api/classes/Circle.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
