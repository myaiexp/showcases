// Sigma.js example: edge label text borders and backgrounds for readability over edges
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Edge label borders and backgrounds',
  summary:
    'Edge labels centred on thick, coloured edges are hard to read. The textBorder primitive outlines each character, and labelBackgroundColor adds a flat box behind the text.',
  section: 'Styling labels',
  tags: ['edge labels', 'textBorder', 'labelBackgroundColor', 'readability'],
  docs: [
    `${DOCS}/how-to/labels/styles-positioning.mdx`,
    `${DOCS}/reference/primitives-schema.md`,
    `${DOCS}/reference/style-properties.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
