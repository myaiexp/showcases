// observable-plot example: Transforms: bin by hand or with binX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transforms: bin by hand or with binX',
  summary:
    'A histogram of athlete weights from d3.bin output passed to x1, x2 and y2, next to the same chart made by binX.',
  section: 'Transforms',
  tags: ['rectY', 'binX', 'x1', 'x2', 'y2'],
  docs: ['repo/docs/features/transforms.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
