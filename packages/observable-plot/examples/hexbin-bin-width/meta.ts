// observable-plot example: Hexbin: bin width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexbin: bin width',
  summary:
    'The binWidth option sets the pixel distance between neighbouring hexagon centres. Output r as count to size each hexagon by how many athletes it holds.',
  section: 'Transform: Hexbin',
  tags: ['dot', 'hexbin', 'binWidth', 'r', 'count'],
  docs: ['repo/docs/transforms/hexbin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
