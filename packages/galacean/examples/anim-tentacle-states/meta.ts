// galacean example: Animation: a state machine on a skinned model
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: a state machine on a skinned model",
  summary:
    "The tentacle's Sway state hands over to Curl and back through two timed crossfade transitions on a controller built in code.",
  section: "Animation",
  tags: ['AnimatorStateTransition','exitTime','SkinnedMeshRenderer','AnimatorController'],
  docs: [
    'repo/docs/en/animation/state-machine.mdx',
    'repo/docs/en/animation/animatorController.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
