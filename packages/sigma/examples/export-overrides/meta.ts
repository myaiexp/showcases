// Sigma.js example: sigmaOverrides and custom dimensions, rendered into an img
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Export with overridden styles and custom dimensions',
  summary:
    'Renders the export with toBlob into an img beside the live stage, trying an object sigmaOverrides, a function override that appends a style rule, and a 1920 x 1080 custom size.',
  section: 'Technical guides',
  tags: ['@sigma/export-image', 'sigmaOverrides', 'toBlob', 'dimensions'],
  docs: [`${DOCS}/how-to/technical/export-image.mdx`, 'repo/packages/export-image/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
