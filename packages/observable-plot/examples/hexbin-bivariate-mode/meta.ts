// observable-plot example: Hexbin: bivariate size and mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexbin: bivariate size and mode',
  summary:
    'r uses count while fill uses the mode reducer over the sex input channel, so size and colour encode two independent things.',
  section: 'Transform: Hexbin',
  tags: ['dot', 'hexbin', 'mode', 'count', 'fill', 'r'],
  docs: ['repo/docs/transforms/hexbin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
