// galacean example: Animation: mute and solo transitions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: mute and solo transitions",
  summary:
    "Three transitions leave Idle; muting them one by one, or soloing Jump, changes which state Idle hands over to.",
  section: "Animation",
  tags: ['mute','solo','AnimatorStateTransition'],
  docs: [
    'repo/docs/en/animation/state-machine.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
