// penrose example: Thick sampled outlines (Challenge 3)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Thick sampled outlines (Challenge 3)',
  summary:
    'Basics challenge 3: each set is a `Rectangle` with a 15 px stroke whose colour comes from `sampleColor(0.5, "rgb")`, a random colour with half opacity. The sizes are left to the optimizer, bounded by two `ensure` lines.',
  section: 'Tutorial: Basics',
  tags: ['Rectangle', 'strokeWidth', 'strokeColor', 'sampleColor'],
  docs: ['repo/packages/docs-site/docs/tutorial/basics.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
