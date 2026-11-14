// observable-plot example: Transforms: normalize a binned series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transforms: normalize a binned series',
  summary:
    'Two transforms composed: binX with y2 turns off the stack, normalizeY with sum scales each sex to 100%, so the two distributions compare fairly.',
  section: 'Transforms',
  tags: ['rectY', 'binX', 'normalizeY', 'y2', 'mixBlendMode'],
  docs: ['repo/docs/features/transforms.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
