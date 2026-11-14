// g6 example: Viewport: resize to a width and height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Viewport: resize to a width and height',
  summary: 'graph.resize(width, height) sets the canvas size and resize() with no arguments refits it to the container. The black stage behind shows the canvas bounds.',
  section: 'API',
  tags: ['resize', 'getSize', 'GraphEvent.AFTER_SIZE_CHANGE'],
  docs: [
    'repo/packages/site/docs/api/viewport.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
