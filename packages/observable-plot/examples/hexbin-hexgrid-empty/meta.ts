// observable-plot example: Hexbin: hexgrid for empty bins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexbin: hexgrid for empty bins',
  summary:
    'The hexbin transform omits empty bins, so the hexgrid mark draws the whole grid underneath to show where no athletes fall.',
  section: 'Transform: Hexbin',
  tags: ['hexgrid', 'dot', 'hexbin', 'r', 'count'],
  docs: ['repo/docs/transforms/hexbin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
