// fabric example: Clip paths: Any shape can clip an image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clip paths: Any shape can clip an image',
  summary: 'A clipPath is an ordinary fabric object, so a Circle, Rect, Triangle, Ellipse, Polygon or Path can clip a FabricImage; only the shape\'s alpha matters, not its fill.',
  section: 'Clip paths',
  tags: ['clipPath', 'FabricImage', 'Circle', 'Rect', 'Triangle', 'Ellipse', 'Polygon', 'Path'],
  docs: ['repo/src/content/docs/docs/Old docs/clippath-part1.mdx', 'repo/src/content/docs/api/classes/FabricImage.md', 'repo/src/content/docs/api/classes/Polygon.md', 'repo/src/content/docs/api/classes/Path.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
