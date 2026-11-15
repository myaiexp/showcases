// penrose example: Rectangle rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rectangle rotation',
  summary:
    'A Rectangle turns about its own centre by `rotation` degrees. The three tabs use 0, 25 and -50, and the centres stay apart because a plain distance constraint ignores the tilt.',
  section: 'Shape: Rectangle',
  tags: ['Rectangle', 'rotation', 'center'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/rectangle.md',
    'repo/packages/core/src/shapes/Rectangle.ts',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
