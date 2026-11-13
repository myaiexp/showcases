// Sigma.js example: edge label position along the edge and fixed or scaled font size
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Edge label position and font size modes',
  summary:
    'Enable edge labels with renderEdgeLabels, place them over, above, below or along the edge, and switch fontSizeMode between a fixed pixel size and one that scales with camera zoom.',
  section: 'Styling labels',
  tags: ['edge labels', 'labelPosition', 'fontSizeMode', 'zoom'],
  docs: [
    `${DOCS}/how-to/labels/styles-positioning.mdx`,
    `${DOCS}/reference/primitives-schema.md`,
    `${DOCS}/reference/style-properties.md`,
    `${DOCS}/reference/settings.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
