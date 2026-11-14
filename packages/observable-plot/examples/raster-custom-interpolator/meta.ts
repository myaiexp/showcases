// observable-plot example: Raster: custom interpolator function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster: custom interpolator function',
  summary:
    'The interpolate option also takes a function of the sample index, grid size and the x, y and value arrays. This one wraps interpolateNearest and rounds each pixel to a band, giving a stepped map; a slider sets the band size.',
  section: 'Mark: Raster',
  tags: ['raster', 'interpolate', 'interpolateNearest', 'diverging'],
  docs: ['repo/docs/marks/raster.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
