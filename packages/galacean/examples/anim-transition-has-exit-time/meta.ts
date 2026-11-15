// galacean example: Animation: with and without exit time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: with and without exit time",
  summary:
    "With hasExitTime true the Idle to Wave transition waits for its exitTime even though its condition is met; with false it fires at once.",
  section: "Animation",
  tags: ['hasExitTime','exitTime','addCondition'],
  docs: [
    'repo/docs/en/animation/state-machine.mdx',
    'repo/docs/en/animation/examples/controlAnimationByInput.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
