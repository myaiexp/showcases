// penrose example: Line with start and end arrowheads
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line with start and end arrowheads',
  summary:
    'Two edges join three dots that the optimizer spreads over the canvas. One tab puts an `endArrowhead` on each edge, another adds a `startArrowhead` of a different style, and a third mixes `none` with a loop.',
  section: 'Shape: Line',
  tags: ['Line', 'startArrowhead', 'endArrowhead', 'Link'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/line.md', 'repo/packages/core/src/shapes/Line.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
