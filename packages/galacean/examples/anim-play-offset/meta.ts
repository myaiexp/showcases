// galacean example: Animation: play from an offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: play from an offset",
  summary:
    "animator.play(state, layerIndex, normalizedTimeOffset) starts the Walk state at a chosen point of its clip; the card steps through quarter offsets.",
  section: "Animation",
  tags: ['Animator','play','normalizedTimeOffset'],
  docs: [
    'repo/docs/en/animation/animator.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
