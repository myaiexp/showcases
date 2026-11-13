// Sigma.js example: growing a graph with graphology's API while sigma renders it
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Building graphs programmatically',
  summary:
    "The docs' alice and bob graph, grown live with addNode, addEdge, mergeEdge and dropNode. Sigma re-renders on every structural change.",
  section: 'Technical guides',
  tags: ['graphology', 'addNode', 'addEdge', 'dropNode'],
  docs: [`${DOCS}/how-to/technical/loading-data.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
