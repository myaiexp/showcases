// 3d-force-graph example: Data input: nodeId
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data input: nodeId',
  summary:
    'nodeId names the field that identifies a node, and the links refer to it. The default is id; here the nodes are keyed by key, and the links give those keys as source and target. New nodes keep arriving under their own keys.',
  section: 'Data input',
  tags: ['nodeId', 'graphData'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
