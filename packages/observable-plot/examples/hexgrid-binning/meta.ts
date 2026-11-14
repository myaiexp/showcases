// observable-plot example: Hexgrid: under a hexbin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexgrid: under a hexbin',
  summary:
    'A hexgrid mark shows the cells that the hexbin transform fills with dots sized by count. binWidth sets both, and they stay aligned.',
  section: 'Mark: Hexgrid',
  tags: ['hexgrid', 'hexbin', 'binWidth', 'dot', 'r'],
  docs: ['repo/docs/marks/hexgrid.md', 'repo/docs/transforms/hexbin.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
