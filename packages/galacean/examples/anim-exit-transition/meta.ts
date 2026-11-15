// galacean example: Animation: the exit transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: the exit transition",
  summary:
    "addExitTransition leads Run to the exit node; the state machine then re-enters at entry and the Idle, Walk, Run chain loops.",
  section: "Animation",
  tags: ['addExitTransition','AnimatorState','addEntryStateTransition'],
  docs: [
    'repo/docs/en/animation/state-machine.mdx',
    'repo/docs/en/animation/examples/crossFade.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
