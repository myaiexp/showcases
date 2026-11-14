// observable-plot example: Dodge: beeswarm against histogram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dodge: beeswarm against histogram',
  summary:
    'The same car weights drawn as a binned rectY histogram and as a dodged beeswarm that keeps every car visible.',
  section: 'Transform: Dodge',
  tags: ['rectY', 'binX', 'dotX', 'dodgeY'],
  docs: ['repo/docs/transforms/dodge.md', 'repo/docs/data/cars.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
