// Sigma.js example: pinning selected nodes on top with a custom state and depth bucket
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Pin selected items on top',
  summary:
    'A custom isSelected node state maps to the topNodes depth bucket, so clicked nodes always paint above the rest of an overlapping pile.',
  section: 'Concepts',
  tags: ['depth', 'depthLayers', 'custom state', 'selection'],
  docs: [
    `${DOCS}/concepts/depth-and-z-order.md`,
    `${DOCS}/reference/state-flags.md`,
    `${DOCS}/reference/style-value-types.md`,
    `${DOCS}/reference/events.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
