// mermaid example: C4 deployment view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'C4 deployment view',
  summary:
    'A C4Deployment diagram with nested Deployment_Node blocks for devices, servers and runtimes, the Node, Node_L and Node_R short forms, and containers placed on them.',
  section: 'C4 Diagram',
  tags: ['c4', 'deployment', 'Deployment_Node', 'Node_L', 'Node_R'],
  docs: ['repo/packages/mermaid/src/docs/syntax/c4.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
