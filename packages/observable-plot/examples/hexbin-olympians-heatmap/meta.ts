// observable-plot example: Hexbin: athlete heatmap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexbin: athlete heatmap',
  summary:
    'dot with the hexbin transform bins athlete weight and height into hexagons and fills each by its count. The colour scheme is switchable.',
  section: 'Transform: Hexbin',
  tags: ['dot', 'hexbin', 'fill', 'count', 'color'],
  docs: ['repo/docs/transforms/hexbin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
