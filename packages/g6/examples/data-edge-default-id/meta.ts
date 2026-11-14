// g6 example: Data: edge ids default to source-target
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data: edge ids default to source-target',
  summary:
    'Edges written without an id get "source-target" as id; the labels show them next to one edge that keeps its own id.',
  section: 'Data',
  tags: ['data.edges', 'id', 'getEdgeData'],
  docs: [
    'repo/packages/site/docs/manual/data.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
