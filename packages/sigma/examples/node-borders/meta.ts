// Sigma.js example: concentric node borders with layerBorder
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Node borders',
  summary:
    'layerBorder from @sigma/node-border draws one or several concentric borders, with relative sizes (a share of the radius) or fixed pixel widths, all read from node attributes.',
  section: 'Styling nodes',
  tags: ['layers', 'border', '@sigma/node-border', 'variables'],
  docs: [
    `${DOCS}/how-to/nodes/fill-layers.mdx`,
    `${DOCS}/reference/style-properties.md`,
    `${DOCS}/reference/primitives-schema.md`,
    'repo/packages/node-border/README.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
