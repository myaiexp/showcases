// Sigma.js example: node backdrops with fill, border, shadow and coverage area
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Node backdrops',
  summary:
    'The backdrop* style properties draw a styled shape (fill, border, corner radius, shadow) behind a highlighted node and its label. backdropArea switches between node, label or both.',
  section: 'Styling nodes',
  tags: ['backdrop', 'highlight', 'shadow', 'styles'],
  docs: [
    `${DOCS}/how-to/nodes/backdrops.mdx`,
    `${DOCS}/reference/style-properties.md`,
    `${DOCS}/reference/state-flags.md`,
    `${DOCS}/reference/primitives-schema.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
