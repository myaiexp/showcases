// observable-plot example: Raster: arctangent of y over x
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster: arctangent of y over x',
  summary:
    'A raster over the square from -1 to 1 whose fill is Math.atan2(y, x), evaluated at every pixel. The interpolate option is ignored for a function fill. Two other functions can be swapped in.',
  section: 'Mark: Raster',
  tags: ['raster', 'fill', 'x1', 'x2', 'y1', 'y2'],
  docs: ['repo/docs/marks/raster.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
