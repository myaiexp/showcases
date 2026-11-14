// g6 example: Polyline routers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polyline routers',
  summary:
    'A polyline edge with no router, the orth router, and the shortest-path router steering round an obstacle node.',
  section: 'Edge',
  tags: ['polyline', 'router', 'orth', 'shortest-path', 'enableObstacleAvoidance'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/Polyline.en.md',
    'repo/packages/site/common/api/elements/edges/polyline.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
