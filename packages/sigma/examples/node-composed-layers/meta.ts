// Sigma.js example: composing fill, border and image layers on one node
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Composing node fill layers',
  summary:
    'layerFill, layerBorder and layerImage are composited back to front in declaration order. A layer with no data for a node draws nothing, so the card steps through the combinations by adding and removing data.',
  section: 'Styling nodes',
  tags: ['layers', 'composition', 'border', 'image'],
  docs: [
    `${DOCS}/how-to/nodes/fill-layers.mdx`,
    `${DOCS}/concepts/styles-and-primitives.mdx`,
    'repo/packages/node-border/README.md',
    'repo/packages/node-image/README.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
