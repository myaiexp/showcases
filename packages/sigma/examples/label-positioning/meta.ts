// Sigma.js example: placing node labels around the node with labelPosition and labelAngle
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Node label positioning',
  summary:
    'The labelPosition style property puts a node label to the right, left, above, below or over the node, and labelAngle rotates it. Switch every node at once or mix all five.',
  section: 'Styling labels',
  tags: ['labels', 'labelPosition', 'labelAngle', 'styles'],
  docs: [
    `${DOCS}/how-to/labels/styles-positioning.mdx`,
    `${DOCS}/reference/style-properties.md`,
    `${DOCS}/reference/style-value-types.md`,
    `${DOCS}/reference/settings.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
