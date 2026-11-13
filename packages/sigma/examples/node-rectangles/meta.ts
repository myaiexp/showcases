// Sigma.js example: sdfRectangle with an aspect ratio read from a node attribute
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Rectangle nodes',
  summary:
    'sdfRectangle draws a rectangle whose aspect ratio comes from a node attribute, with its long side spanning the node size. A slider (or a loop in the card) morphs the ratios between squares and stretched boxes.',
  section: 'Styling nodes',
  tags: ['shapes', 'rectangle', 'aspectRatio', 'cornerRadius'],
  docs: [`${DOCS}/how-to/nodes/shapes.mdx`, `${DOCS}/reference/primitives-schema.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
