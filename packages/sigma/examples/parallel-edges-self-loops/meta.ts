// Sigma.js example: parallel edges and self-loops in a multi graph
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Parallel edges and self-loops',
  summary:
    'A multi graph where several edges join the same pair of nodes. parallelPath curves them apart, parallelSpread sets the spacing, and selfLoopPath draws edges that return to their own node.',
  section: 'Styling edges',
  tags: ['edges', 'multi graph', 'parallelSpread', 'self-loops'],
  docs: [
    `${DOCS}/how-to/edges/parallel-edges-self-loops.mdx`,
    `${DOCS}/reference/style-properties.md`,
    `${DOCS}/reference/state-flags.md`,
    `${DOCS}/reference/primitives-schema.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
