// Sigma.js example: neighbour highlighting with custom state and depth layers
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Neighbour highlighting with depth layers',
  summary:
    'Hover a node and its neighbourhood stays coloured while the rest greys out. Custom node, edge and graph state drive when/then style rules, and depthLayers paint the active subgraph on top.',
  section: 'Get started',
  tags: ['custom state', 'depthLayers', 'hover', 'conditional styles'],
  docs: [
    `${DOCS}/get-started/add-interactivity.mdx`,
    `${DOCS}/reference/state-flags.md`,
    `${DOCS}/reference/style-value-types.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
