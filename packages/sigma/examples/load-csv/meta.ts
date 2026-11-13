// Sigma.js example: building a graph from CSV text parsed by papaparse
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Loading from CSV',
  summary:
    'Papa Parse turns a nodes CSV and an edges CSV into row objects, and a loop adds them to a graphology graph with parseFloat and fallbacks. The CSV text is inline, so nothing is fetched.',
  section: 'Technical guides',
  tags: ['csv', 'papaparse', 'loading data', 'graphology'],
  docs: [`${DOCS}/how-to/technical/loading-data.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
