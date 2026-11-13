// mermaid example: ER diagram subgraphs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ER diagram subgraphs',
  summary:
    'subgraph blocks that group entities, with ids, titles and nesting, relationships that point at a subgraph, and a direction per subgraph.',
  section: 'Entity Relationship Diagram',
  tags: ['er', 'subgraph', 'direction', 'nesting'],
  docs: ['repo/packages/mermaid/src/docs/syntax/entityRelationshipDiagram.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
