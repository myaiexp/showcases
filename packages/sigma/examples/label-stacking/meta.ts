// Sigma.js example: labelDepth lifts labels above unrelated nodes
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Labels above other nodes',
  summary:
    'A label paints in the same depth bucket as its node, so neighbours can hide it. Setting labelDepth to a higher bucket from primitives.depthLayers lifts every label above all nodes.',
  section: 'Styling labels',
  tags: ['labels', 'labelDepth', 'depthLayers', 'z-order'],
  docs: [
    `${DOCS}/how-to/labels/styles-positioning.mdx`,
    `${DOCS}/concepts/depth-and-z-order.md`,
    `${DOCS}/reference/primitives-schema.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
