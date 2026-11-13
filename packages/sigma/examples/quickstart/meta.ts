// Sigma.js example: the quickstart graph of three nodes and three edges
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Quickstart: three nodes',
  summary:
    'A graphology graph with three positioned, coloured nodes handed to new Sigma(). Default styles read x, y, size, color and label straight from the node attributes.',
  section: 'Get started',
  tags: ['graphology', 'default styles', 'kill'],
  docs: [`${DOCS}/get-started/quickstart.mdx`, `${DOCS}/concepts/lifecycle.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
