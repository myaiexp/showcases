// AntV Infographic example: JSX primitive: Rect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSX primitive: Rect',
  summary:
    'Rect maps to an SVG rect and takes x, y, width and height like every primitive, plus rx and the usual paint props. The steps show a plain rectangle, a rounded outlined one and three overlapping translucent ones; the panel prints the SVG each JSX tree becomes.',
  section: 'JSX primitives',
  tags: ['Rect', 'renderSVG', 'rx', 'stroke', 'opacity', 'jsxImportSource'],
  docs: [
    'repo/site/src/content/reference/primitive-nodes.en.md',
    'repo/site/src/content/reference/jsx.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
