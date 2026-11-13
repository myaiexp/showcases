// Sigma.js example: the five built-in SDF node shapes
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Built-in node shapes',
  summary:
    'Declare sdfCircle, sdfSquare, sdfTriangle, sdfDiamond and sdfRectangle in primitives.nodes.shapes, then pick one per node with the `shape` style property. The bottom row cycles through them.',
  section: 'Styling nodes',
  tags: ['shapes', 'sdf', 'primitives', 'styles'],
  docs: [
    `${DOCS}/how-to/nodes/shapes.mdx`,
    `${DOCS}/reference/primitives-schema.md`,
    `${DOCS}/reference/style-properties.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
