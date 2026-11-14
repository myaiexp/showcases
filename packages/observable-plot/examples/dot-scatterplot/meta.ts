// observable-plot example: Dot: derived x value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dot: derived x value',
  summary:
    'A dot scatterplot of horsepower against fuel efficiency. Switching x from a field name to a function turns miles per gallon into gallons per 100 miles, and the relation turns roughly linear.',
  section: 'Mark: Dot',
  tags: ['dot', 'x', 'y', 'grid', 'inset'],
  docs: ['repo/docs/marks/dot.md', 'repo/docs/data/cars.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
