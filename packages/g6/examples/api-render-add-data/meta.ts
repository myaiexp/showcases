// g6 example: Render: addData then render
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render: addData then render',
  summary: 'graph.addData() queues new nodes and edges. render() lays them out with the rest; draw() paints them where they were given, here the origin.',
  section: 'API',
  tags: ['addData', 'render', 'draw', 'circular'],
  docs: [
    'repo/packages/site/docs/api/render.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
