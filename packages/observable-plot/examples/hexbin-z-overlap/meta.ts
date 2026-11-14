// observable-plot example: Hexbin: z partitions bins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexbin: z partitions bins',
  summary:
    'Setting z to sex splits each bin by value, giving separate overlapping hexagons for each sex. Without z all athletes in a bin share one hexagon.',
  section: 'Transform: Hexbin',
  tags: ['dot', 'hexbin', 'z', 'stroke', 'mode'],
  docs: ['repo/docs/transforms/hexbin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
