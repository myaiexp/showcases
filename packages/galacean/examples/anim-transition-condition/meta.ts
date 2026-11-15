// galacean example: Animation: transition conditions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: transition conditions",
  summary:
    "Conditions on a float parameter: speed above 0 walks, above 5 runs, and back down again, driven with Animator.setParameterValue.",
  section: "Animation",
  tags: ['addCondition','AnimatorConditionMode','addParameter','setParameterValue'],
  docs: [
    'repo/docs/en/animation/state-machine.mdx',
    'repo/docs/en/animation/examples/controlAnimationByInput.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
