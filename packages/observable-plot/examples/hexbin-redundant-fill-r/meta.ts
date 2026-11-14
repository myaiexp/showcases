// observable-plot example: Hexbin: redundant fill and r
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexbin: redundant fill and r',
  summary:
    'Outputting both fill and r from count encodes the same number twice. Setting a stroke keeps the smallest hexagons visible.',
  section: 'Transform: Hexbin',
  tags: ['dot', 'hexbin', 'fill', 'r', 'stroke', 'count'],
  docs: ['repo/docs/transforms/hexbin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
