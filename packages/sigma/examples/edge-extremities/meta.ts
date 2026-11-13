// Sigma.js example: the five built-in edge extremities
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Arrows and other extremities',
  summary:
    'Arrow, bar, circle, diamond and square extremities declared in primitives.edges.extremities, then assigned to the head and tail of each edge, on straight and curved paths.',
  section: 'Styling edges',
  tags: ['edges', 'extremities', 'arrows', 'head', 'tail'],
  docs: [
    `${DOCS}/how-to/edges/extremities.mdx`,
    `${DOCS}/reference/primitives-schema.md`,
    `${DOCS}/reference/style-properties.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
