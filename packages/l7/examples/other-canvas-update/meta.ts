// l7 example: CanvasLayer update mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CanvasLayer update mode',
  summary:
    'style({ update }) is \'always\' (redraw on every map change) or \'dragend\' (redraw after a drag or zoom ends). The canvas content here is a grid of dots at fixed coordinates: with \'dragend\' it lags while you move.',
  section: 'Other Layers',
  tags: ['CanvasLayer', 'style', 'update', 'always', 'dragend'],
  docs: [
    'repo/site/docs/api/other/canvas.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
