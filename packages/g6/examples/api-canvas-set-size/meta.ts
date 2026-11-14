// g6 example: Canvas: setSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas: setSize',
  summary: 'graph.setSize(width, height) sets the canvas container size and keeps it, so a later resize() with no arguments reuses it. Sliders and a reset button drive it.',
  section: 'API',
  tags: ['setSize', 'getSize', 'resize'],
  docs: [
    'repo/packages/site/docs/api/canvas.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
