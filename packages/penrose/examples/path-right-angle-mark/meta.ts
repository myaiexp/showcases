// penrose example: orientedSquare and innerPointOffset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'orientedSquare and innerPointOffset',
  summary:
    'Two perpendicular segments meet at a corner whose direction is sampled. `orientedSquare` returns the little square path that marks the right angle, and `innerPointOffset` finds the square\'s far corner, shown as a red dot, on the side of the angle that holds the second segment.',
  section: 'Computation: Paths & Curves',
  tags: ['orientedSquare', 'innerPointOffset', 'Path', 'Line'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
