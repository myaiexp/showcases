// Sigma.js example: zIndex bound to degree to order overlapping nodes
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Sort nodes by degree with zIndex',
  summary:
    'zIndex orders nodes inside a depth bucket. Bound to a numeric attribute it sorts an overlapping blob by degree: hubs over leaves, leaves over hubs, or no order at all.',
  section: 'Concepts',
  tags: ['zIndex', 'degree', 'z-order', 'attribute binding'],
  docs: [
    `${DOCS}/concepts/depth-and-z-order.md`,
    `${DOCS}/reference/style-properties.md`,
    `${DOCS}/reference/style-value-types.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
