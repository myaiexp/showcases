// Sigma.js example: node label font family, size and colour via style properties
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Label font and colour',
  summary:
    'labelFont, labelSize and labelColor restyle node label text. Pick a font family, size and colour and watch the labels re-render.',
  section: 'Styling labels',
  tags: ['labels', 'labelFont', 'labelSize', 'labelColor'],
  docs: [`${DOCS}/how-to/labels/styles-positioning.mdx`, `${DOCS}/reference/style-properties.md`, `${DOCS}/reference/settings.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
