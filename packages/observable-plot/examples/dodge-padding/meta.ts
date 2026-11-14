// observable-plot example: Dodge: padding between dots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dodge: padding between dots',
  summary:
    'The padding option of dodgeY adds pixels to each dot radius when packing; negative values let dots overlap.',
  section: 'Transform: Dodge',
  tags: ['dot', 'dodgeY', 'padding'],
  docs: ['repo/docs/transforms/dodge.md', 'repo/docs/data/cars.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
