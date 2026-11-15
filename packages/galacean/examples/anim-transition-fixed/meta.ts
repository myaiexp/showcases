// galacean example: Animation: fixed-duration transitions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: fixed-duration transitions",
  summary:
    "isFixedDuration makes a transition's duration count in seconds; the other transition's duration is a share of the destination clip.",
  section: "Animation",
  tags: ['isFixedDuration','AnimatorStateTransition','duration'],
  docs: [
    'repo/docs/en/animation/state-machine.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
