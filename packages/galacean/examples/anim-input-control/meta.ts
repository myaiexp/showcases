// galacean example: Animation: control animation by keyboard
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: control animation by keyboard",
  summary:
    "The docs' input script: hold W to walk, W with Shift to run, release to idle; it sets a speed parameter that the transition conditions read.",
  section: "Animation",
  tags: ['Script','Keys','setParameterValue','isKeyHeldDown','AnimatorConditionMode'],
  docs: [
    'repo/docs/en/animation/examples/controlAnimationByInput.mdx',
    'repo/docs/en/animation/state-machine.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
