// g6 example: Render: draw and render lifecycle events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render: draw and render lifecycle events',
  summary: 'GraphEvent BEFORE_DRAW, AFTER_DRAW, BEFORE_RENDER and AFTER_RENDER, logged with a timestamp. render() fires both pairs; draw() only the draw pair.',
  section: 'API',
  tags: ['GraphEvent.BEFORE_DRAW', 'GraphEvent.AFTER_DRAW', 'GraphEvent.BEFORE_RENDER', 'GraphEvent.AFTER_RENDER', 'draw', 'render'],
  docs: [
    'repo/packages/site/docs/api/render.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
