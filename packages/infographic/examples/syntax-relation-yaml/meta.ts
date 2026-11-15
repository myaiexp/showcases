// AntV Infographic example: Syntax: relation data as YAML nodes and relations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Syntax: relation data as YAML nodes and relations',
  summary:
    'Relation data has nodes and relations. A node without an id uses its label as the id, and a relation names its source and target with from and to. The steps start with two nodes and add a third with its own id.',
  section: 'Infographic syntax',
  tags: ['nodes', 'relations', 'from', 'to', 'id', 'relation-dagre-flow-tb-simple-circle-node'],
  docs: [
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
