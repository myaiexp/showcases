// mermaid example: Subgraphs with their own direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subgraphs with their own direction',
  summary:
    'Subgraphs group nodes, accept edges to and from the box itself and can flow in their own direction, until a node inside links outside.',
  section: 'Flowchart',
  tags: ['flowchart', 'subgraph', 'direction', 'nested'],
  docs: ['repo/packages/mermaid/src/docs/syntax/flowchart.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
