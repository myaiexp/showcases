// g6 example: Polyline control points added one by one
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polyline control points added one by one',
  summary:
    'Each press adds a control point and a marker node to a polyline edge, as in the docs random-point control.',
  section: 'Edge',
  tags: ['polyline', 'controlPoints', 'addNodeData', 'updateEdgeData'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/Polyline.en.md',
    'repo/packages/site/common/api/elements/edges/polyline.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
