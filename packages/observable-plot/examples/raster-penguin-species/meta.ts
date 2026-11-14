// observable-plot example: Raster: categorical species map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster: categorical species map',
  summary:
    'Penguin species interpolated over culmen length and depth with the random-walk interpolator. The fill is a category, so each pixel takes the species of a sample; the dots mark the real penguins.',
  section: 'Mark: Raster',
  tags: ['raster', 'interpolate', 'fill', 'dot', 'legend', 'categorical'],
  docs: ['repo/docs/marks/raster.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
