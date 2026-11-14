// g6 example: Render: clear and render again
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render: clear and render again',
  summary: 'graph.clear() removes every node and edge but keeps the canvas and options; render() brings the original data back.',
  section: 'API',
  tags: ['clear', 'render', 'getData'],
  docs: [
    'repo/packages/site/docs/api/render.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
