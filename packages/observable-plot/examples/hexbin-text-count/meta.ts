// observable-plot example: Hexbin: text labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexbin: text labels',
  summary:
    'The hexbin transform works with any mark that has x and y. A text mark with a text output channel labels each hexagon centre with its count.',
  section: 'Transform: Hexbin',
  tags: ['text', 'dot', 'hexbin', 'text channel', 'count'],
  docs: ['repo/docs/transforms/hexbin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
