// galacean example: Animation: trim a state's clip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: trim a state's clip",
  summary:
    "clipStartTime and clipEndTime on an AnimatorState play only a normalized slice of the Walk clip.",
  section: "Animation",
  tags: ['AnimatorState','clipStartTime','clipEndTime'],
  docs: [
    'repo/docs/en/animation/state-machine.mdx',
    'repo/docs/en/animation/system.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
