// penrose example: Image rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image rotation',
  summary:
    'Images rotate like Rectangles, about the centre of their box. The arrow picture is rotated 0, 90 and -45 degrees on three tabs, with the centres kept apart by a distance constraint since the box does not grow with the turn.',
  section: 'Shape: Image',
  tags: ['Image', 'rotation', 'href'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/image.md',
    'repo/packages/core/src/shapes/Image.ts',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
