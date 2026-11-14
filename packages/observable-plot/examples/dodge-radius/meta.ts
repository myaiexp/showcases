// observable-plot example: Dodge: dot radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dodge: dot radius',
  summary:
    'dodgeY respects each dot radius r, so larger dots need taller piles; slide r to see the layout change.',
  section: 'Transform: Dodge',
  tags: ['dot', 'dodgeY', 'r'],
  docs: ['repo/docs/transforms/dodge.md', 'repo/docs/data/cars.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
