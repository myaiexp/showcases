// AntV Infographic example: JSX primitive: Ellipse (x and y are the top-left corner)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSX primitive: Ellipse (x and y are the top-left corner)',
  summary:
    'Ellipse takes x, y, width and height, not cx, cy and r: x and y are the corner of its bounding box. The first step draws the box in a dashed Rect to show it; equal width and height make a circle in the second, and the third places a ring at a corner.',
  section: 'JSX primitives',
  tags: ['Ellipse', 'renderSVG', 'bounding box', 'width', 'height'],
  docs: [
    'repo/site/src/content/reference/primitive-nodes.en.md',
    'repo/site/src/content/reference/jsx.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
