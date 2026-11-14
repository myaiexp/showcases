// g6 example: Edge source and target ports
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edge source and target ports',
  summary:
    'sourcePort and targetPort pick which of four node ports an orthogonally routed polyline edge leaves and enters.',
  section: 'Edge',
  tags: ['sourcePort', 'targetPort', 'ports', 'polyline'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/BaseEdge.en.md',
    'repo/packages/site/docs/manual/element/node/BaseNode.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
