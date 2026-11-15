// galacean example: Animation: trigger parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: trigger parameters",
  summary:
    "A trigger parameter fires its transition once and resets itself: each activateTriggerParameter makes Idle wave a single time.",
  section: "Animation",
  tags: ['addTriggerParameter','activateTriggerParameter','AnimatorConditionMode'],
  docs: [
    'repo/docs/en/animation/state-machine.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
