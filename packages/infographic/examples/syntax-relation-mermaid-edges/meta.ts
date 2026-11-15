// AntV Infographic example: Syntax: Mermaid-style relation lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Syntax: Mermaid-style relation lines',
  summary:
    'Under relations an edge can be one line instead of a from/to pair: A -> B, A <- C, or a chain such as A -> B -> C -> A. The nodes block still names the nodes and their labels.',
  section: 'Infographic syntax',
  tags: ['relations', 'nodes', 'A -> B', 'chain', 'relation-dagre-flow-tb-simple-circle-node'],
  docs: [
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
