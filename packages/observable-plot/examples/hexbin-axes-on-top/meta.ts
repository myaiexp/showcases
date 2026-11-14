// observable-plot example: Hexbin: axes drawn on top
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexbin: axes drawn on top',
  summary:
    'Adding axisX and axisY marks after the dots draws the axes over the hexagons instead of beneath them.',
  section: 'Transform: Hexbin',
  tags: ['axisX', 'axisY', 'dot', 'hexbin'],
  docs: ['repo/docs/transforms/hexbin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
