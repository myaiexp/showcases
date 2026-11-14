// observable-plot example: Raster: the raw survey samples
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster: the raw survey samples',
  summary:
    'Magnetic field samples from a 1955 aeromagnetic survey, as dots and as lines per flight segment, coloured on a diverging scale. The irregular grid is what the raster interpolators fill in.',
  section: 'Mark: Raster',
  tags: ['dot', 'line', 'fill', 'stroke', 'z', 'diverging'],
  docs: ['repo/docs/marks/raster.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
