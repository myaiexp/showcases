// penrose example: Rectangle with optimized width and height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rectangle with optimized width and height',
  summary:
    'Neither `width` nor `height` is written, so both start sampled and move with the layout. Bounds keep them between 30 and 130, and `encourage` pulls the width towards twice the height, which draws a family of similar landscape rectangles.',
  section: 'Shape: Rectangle',
  tags: ['Rectangle', 'width', 'height', 'encourage', 'ensure'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/rectangle.md',
    'repo/packages/core/src/shapes/Rectangle.ts',
    'repo/packages/core/src/shapes/Samplers.ts',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
