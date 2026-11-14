// observable-plot example: Raster: Mandelbrot set from a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster: Mandelbrot set from a function',
  summary:
    'With no data, the raster fill can be a function f(x, y) called at the centre of each pixel, like a fragment shader. x1, x2, y1 and y2 set the domain; here the function counts iterations until the point escapes, over three views.',
  section: 'Mark: Raster',
  tags: ['raster', 'fill', 'x1', 'x2', 'y1', 'y2', 'aspectRatio', 'pixelSize'],
  docs: ['repo/docs/marks/raster.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
