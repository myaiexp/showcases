// observable-plot example: Hexbin: inset and clip at the edge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexbin: inset and clip at the edge',
  summary:
    'Hexagons near the frame edge can spill over the axes. The inset scale option reserves room, or the dot clip option cuts them at the frame.',
  section: 'Transform: Hexbin',
  tags: ['dot', 'hexbin', 'inset', 'clip'],
  docs: ['repo/docs/transforms/hexbin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
