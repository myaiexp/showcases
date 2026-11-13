// Sigma.js example: loading a GEXF document into graphology and sigma
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Loading a GEXF file',
  summary:
    'graphology-gexf parses a GEXF string (positions, colours, sizes and labels from its viz data) into a graph that sigma renders as is. The document is generated inline, so nothing is fetched.',
  section: 'Technical guides',
  tags: ['gexf', 'graphology-gexf', 'loading data', 'parse'],
  docs: [`${DOCS}/how-to/technical/loading-data.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
