// penrose example: Rectangle cornerRadius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rectangle cornerRadius',
  summary:
    'Three tabs draw the same two rectangles with `cornerRadius` 0, 14 and 30. The radius rounds all four corners equally, and a value of half the height turns a rectangle into a pill.',
  section: 'Shape: Rectangle',
  tags: ['Rectangle', 'cornerRadius', 'width', 'height'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/rectangle.md',
    'repo/packages/core/src/shapes/Rectangle.ts',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
