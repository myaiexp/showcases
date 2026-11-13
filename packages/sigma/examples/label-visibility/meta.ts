// Sigma.js example: label culling settings and per-node labelVisibility
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Label visibility and density',
  summary:
    'Sigma culls overlapping labels on its own. Tune labelDensity and labelRenderedSizeThreshold, or override per node with labelVisibility "visible" or "hidden".',
  section: 'Styling labels',
  tags: ['labels', 'labelDensity', 'labelRenderedSizeThreshold', 'labelVisibility'],
  docs: [
    `${DOCS}/how-to/labels/styles-positioning.mdx`,
    `${DOCS}/reference/settings.md`,
    `${DOCS}/reference/style-properties.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
