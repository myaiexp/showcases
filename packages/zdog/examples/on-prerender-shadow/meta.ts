// Zdog example: a bouncing ball with a canvas-drawn floor grid and shadow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'onPrerender shadow',
  summary:
    'A ball bounces across a floor grid, and its shadow shrinks and fades as it rises. The grid and the shadow are not Zdog shapes: they are drawn straight onto the canvas by onPrerender, which runs before the model each frame. Use it for backdrops and effects that sit behind the scene.',
  section: 'API: Illustration',
  tags: ['Illustration', 'onPrerender', 'canvas', 'centered'],
  docs: ['repo/modules/docs/api-illo.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
