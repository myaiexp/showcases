// observable-plot example: Raster: volcano elevation grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster: volcano elevation grid',
  summary:
    'The raster mark turns an 87 by 61 grid of elevations into an image. The data is a flat list in row-major order, with the first number at the bottom-left corner; width and height say how to wrap it.',
  section: 'Mark: Raster',
  tags: ['raster', 'width', 'height', 'legend', 'color'],
  docs: ['repo/docs/marks/raster.md', 'repo/docs/data/volcano.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
