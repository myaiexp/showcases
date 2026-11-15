// penrose example: Line arrowhead size and colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line arrowhead size and colour',
  summary:
    'Arrowheads are sized in units of the stroke width and scaled again by `startArrowheadSize` and `endArrowheadSize`. The tabs draw the same two edges at size 0.7, 1.5 and 2.5, and the arrowhead always takes the Line\'s `strokeColor`.',
  section: 'Shape: Line',
  tags: ['Line', 'endArrowheadSize', 'startArrowheadSize', 'strokeColor', 'strokeWidth'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/line.md', 'repo/packages/core/src/shapes/Line.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
