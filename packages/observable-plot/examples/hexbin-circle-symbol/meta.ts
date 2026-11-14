// observable-plot example: Hexbin: circle symbol
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexbin: circle symbol',
  summary:
    'The hexbin transform defaults the symbol to hexagon. The circle constructor changes it to circle for round bubbles.',
  section: 'Transform: Hexbin',
  tags: ['circle', 'dot', 'hexbin', 'symbol', 'r'],
  docs: ['repo/docs/transforms/hexbin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
