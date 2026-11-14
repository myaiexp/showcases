// observable-plot example: Raster: blurring a random walk
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster: blurring a random walk',
  summary:
    'The random-walk interpolator gives each pixel the value of a sample it reaches by chance, so the image is grainy. The blur option, a pixel radius, smooths the grain away.',
  section: 'Mark: Raster',
  tags: ['raster', 'interpolate', 'blur', 'pixelSize'],
  docs: ['repo/docs/marks/raster.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
