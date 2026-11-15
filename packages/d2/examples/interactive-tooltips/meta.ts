// d2 example: Tooltips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltips',
  summary:
    'A `tooltip` field attaches secondary text to a shape. D2 renders it as an SVG title element and marks the shape with a small icon; the text appears on hover. The card cannot hover, so open the full view and point at x or y.',
  section: 'Interactive',
  tags: ['tooltip', 'interactive'],
  docs: ['repo/docs/tour/interactive.md', 'repo/static/d2/tooltip.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
