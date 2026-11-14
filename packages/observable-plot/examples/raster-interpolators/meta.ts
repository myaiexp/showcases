// observable-plot example: Raster: spatial interpolators
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster: spatial interpolators',
  summary:
    'The same irregular samples painted four ways with the interpolate option. none drops each sample into its pixel, nearest makes a Voronoi diagram, barycentric blends over a Delaunay triangulation, and random-walk takes a grainy walk to the nearest sample.',
  section: 'Mark: Raster',
  tags: ['raster', 'interpolate', 'pixelSize', 'diverging'],
  docs: ['repo/docs/marks/raster.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
