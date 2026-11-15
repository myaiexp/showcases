// penrose example: Line flipStartArrowhead
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line flipStartArrowhead',
  summary:
    'A `startArrowhead` points out of the line start by default. With `flipStartArrowhead : true` it faces the same way as the end one, which suits a tail on a chain of arrows. The tabs compare both settings with a `concave` head.',
  section: 'Shape: Line',
  tags: ['Line', 'flipStartArrowhead', 'startArrowhead', 'endArrowhead'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/line.md', 'repo/packages/core/src/shapes/Line.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
