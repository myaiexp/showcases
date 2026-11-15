// galacean example: Animation: any state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: any state",
  summary:
    "addAnyStateTransition lets a trigger reach Jump from Idle, Walk or Run, whichever is playing, then Jump returns to Idle.",
  section: "Animation",
  tags: ['addAnyStateTransition','addTriggerParameter','activateTriggerParameter'],
  docs: [
    'repo/docs/en/animation/state-machine.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
