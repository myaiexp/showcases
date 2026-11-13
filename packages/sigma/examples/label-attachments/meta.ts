// Sigma.js example: label attachments as SVG cards drawn next to node labels
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Label attachments',
  summary:
    'Declare an SVG renderer in primitives.nodes.labelAttachments, assign it with labelAttachment on hover, and place it around the label with labelAttachmentPlacement.',
  section: 'Styling labels',
  tags: ['labels', 'labelAttachment', 'svg', 'hover'],
  docs: [
    `${DOCS}/how-to/labels/attachments.mdx`,
    `${DOCS}/reference/primitives-schema.md`,
    `${DOCS}/reference/style-properties.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
