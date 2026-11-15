// penrose example: strokeLinejoin passthrough
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'strokeLinejoin passthrough',
  summary:
    'Penrose has no linejoin property, but any other SVG property can be written on a shape, camelCased: `strokeLinejoin : "round"` becomes `stroke-linejoin`. The tabs round, bevel and mitre the corners of a thick zigzag.',
  section: 'Passthrough SVG',
  tags: ['strokeLinejoin', 'passthrough', 'Polyline'],
  docs: ['repo/packages/docs-site/docs/ref/style/passthrough.md', 'repo/packages/docs-site/docs/ref/style/shapes/polyline.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
