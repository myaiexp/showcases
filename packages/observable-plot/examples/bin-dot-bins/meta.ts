// observable-plot example: Bin: dots on one dimension
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: dots on one dimension',
  summary:
    'binX also outputs x centres, so dots can sit on a single row, each sized by how many athletes fall in its weight bin.',
  section: 'Transform: Bin',
  tags: ['binX', 'dot', 'r', 'count'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
