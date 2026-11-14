// playcanvas example: Integer, boolean and trigger parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Integer, boolean and trigger parameters',
  summary:
    "One state graph reads three kinds of parameter: an integer picks idle, walk or run through equals conditions, a boolean holds a wave until it is cleared, and a trigger starts a jump that the transition resets. Transition priorities decide which wins, and setTrigger with its single-frame flag discards a jump nothing used.",
  section: 'Animation',
  tags: ['AnimComponent', 'setInteger', 'setBoolean', 'setTrigger', 'ANIM_PARAMETER_INTEGER', 'ANIM_PARAMETER_BOOLEAN', 'ANIM_EQUAL_TO', 'ANIM_NOT_EQUAL_TO', 'priority'],
  docs: [
    'repo/docs/user-manual/animation/state-graphs.md',
    'repo/docs/user-manual/animation/playing-animations.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
