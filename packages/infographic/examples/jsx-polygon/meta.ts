// AntV Infographic example: JSX primitive: Polygon with a points array
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSX primitive: Polygon with a points array',
  summary:
    'Polygon takes points as an array of {x, y} objects, never a string. The steps pass a hand-written triangle, a five-pointed star and a hexagon computed with trigonometry, so you see that the array can come from code.',
  section: 'JSX primitives',
  tags: ['Polygon', 'points', 'renderSVG', 'Point'],
  docs: [
    'repo/site/src/content/reference/primitive-nodes.en.md',
    'repo/site/src/content/reference/jsx.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
