// Zdog example: one dot globe drawn on canvas and on SVG, with frame cost
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas or SVG?',
  summary:
    'The same globe of dots drawn twice: on a <canvas> on the left and an <svg> on the right. The pictures match exactly; the cost does not. Add dots in the full view and watch the per-frame time: canvas copes with many shapes, while SVG keeps one element per shape but stays sharp at any size.',
  section: 'Extras',
  tags: ['canvas', 'svg', 'Illustration', 'element', 'performance'],
  docs: ['repo/content/extras.hbs', 'repo/modules/docs/api-illo.hbs', 'repo/modules/docs/shapes-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
