// observable-plot example: Raster: pixels of a small grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster: pixels of a small grid',
  summary:
    'A 10 by 10 grid shown as numbers with a text mark, then as a raster underneath them. The first row is at the bottom because y points up, and each value sits at a pixel centre. imageRendering pixelated shows the grid cells instead of smoothing them.',
  section: 'Mark: Raster',
  tags: ['raster', 'text', 'imageRendering', 'identity', 'width', 'height'],
  docs: ['repo/docs/marks/raster.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
