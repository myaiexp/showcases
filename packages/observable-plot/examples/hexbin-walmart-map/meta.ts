// observable-plot example: Hexbin: Walmart stores on a map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexbin: Walmart stores on a map',
  summary:
    'Hexbin under an albers projection: r counts nearby stores and fill takes the earliest opening date in each hexagon. A toggle drops the date encoding.',
  section: 'Transform: Hexbin',
  tags: ['dot', 'geo', 'hexbin', 'projection', 'r', 'fill', 'min'],
  docs: ['repo/docs/transforms/hexbin.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
