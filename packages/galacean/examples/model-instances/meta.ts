// galacean example: Model: one Animator per instance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: one Animator per instance",
  summary:
    "Five instantiateSceneRoot() copies of the robot each carry their own Animator, so every copy plays a different clip from a different start time.",
  section: "Model",
  tags: ['instantiateSceneRoot','Animator','play'],
  docs: [
    'repo/docs/en/graphics/model/use.mdx',
    'repo/docs/en/animation/animatorController.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
