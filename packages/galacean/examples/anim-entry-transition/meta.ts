// galacean example: Animation: the entry transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: the entry transition",
  summary:
    "addEntryStateTransition connects the entry node to the Walk state: the robot on the right plays without any animator.play call, the one on the left stays in its rest pose.",
  section: "Animation",
  tags: ['AnimatorStateMachine','addEntryStateTransition'],
  docs: [
    'repo/docs/en/animation/state-machine.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
