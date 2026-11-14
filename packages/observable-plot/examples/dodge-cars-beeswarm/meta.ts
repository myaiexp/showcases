// observable-plot example: Dodge: car weight beeswarm
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dodge: car weight beeswarm',
  summary:
    'dotX with dodgeY piles car dots at their weight without overlap; title gives each dot a tip with the car name.',
  section: 'Transform: Dodge',
  tags: ['dotX', 'dodgeY', 'title', 'beeswarm'],
  docs: ['repo/docs/transforms/dodge.md', 'repo/docs/data/cars.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
