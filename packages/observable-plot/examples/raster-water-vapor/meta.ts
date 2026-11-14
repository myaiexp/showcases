// observable-plot example: Raster: projected water vapour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster: projected water vapour',
  summary:
    'A 360 by 180 grid of atmospheric water vapour drawn through an equal-earth projection. x1, y1, x2 and y2 place the grid on the globe, barycentric interpolation fills it in, and clip sphere trims it to the globe outline.',
  section: 'Mark: Raster',
  tags: ['raster', 'projection', 'interpolate', 'clip', 'sphere', 'BuPu'],
  docs: ['repo/docs/marks/raster.md', 'repo/docs/features/projections.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
