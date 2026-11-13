// Sigma.js example: load a clustered dataset into a graphology graph
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Load a dataset',
  summary:
    'About 2,000 clustered nodes built from a Wikipedia-shaped dataset: cluster becomes colour and score becomes size at build time, then new Sigma() renders it.',
  section: 'Get started',
  tags: ['dataset', 'graphology', 'default styles', 'clusters'],
  docs: [`${DOCS}/get-started/load-a-dataset.mdx`, `${DOCS}/reference/camera-api.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
