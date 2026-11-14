// playcanvas example: A state graph with parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A state graph with parameters',
  summary:
    "A state graph is data: START leads to Idle, a speed float parameter moves between Idle and Walk, and a jump trigger leaves ANY for a non-looping Jump that exits through END at an exit time of 1. loadStateGraph loads it, the layer links clips to the states, and setFloat and setTrigger drive it.",
  section: 'Animation',
  tags: ['AnimComponent', 'loadStateGraph', 'setFloat', 'setTrigger', 'ANIM_PARAMETER_FLOAT', 'ANIM_PARAMETER_TRIGGER', 'ANIM_GREATER_THAN', 'AnimComponentLayer'],
  docs: [
    'repo/docs/user-manual/animation/state-graphs.md',
    'repo/docs/user-manual/animation/playing-animations.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
