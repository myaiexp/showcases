// observable-plot example: Vector: spike map of population
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector: spike map of population',
  summary:
    'Plot.spike is a vector with the spike shape anchored at its start: geoCentroid places one per county, length is population, and the length scale range sets the tallest spike in pixels.',
  section: 'Mark: Vector',
  tags: ['spike', 'geoCentroid', 'geo', 'projection', 'length', 'shape'],
  docs: ['repo/docs/marks/vector.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
