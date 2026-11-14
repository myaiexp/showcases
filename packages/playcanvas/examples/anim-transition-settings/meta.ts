// playcanvas example: Transition duration, exit time and offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transition duration, exit time and offset',
  summary:
    "A trigger sends a creature through Wave, Jump and back to Idle, each one-shot state left by a transition. The sliders change the cross-fade time, the exit time at which Wave hands over to Jump (a fraction of the clip) and the offset where Jump starts, reloading the graph; the layer's transition progress is printed.",
  section: 'Animation',
  tags: ['AnimComponent', 'loadStateGraph', 'exitTime', 'transitionOffset', 'time', 'transitionProgress', 'setTrigger', 'AnimComponentLayer'],
  docs: ['repo/docs/user-manual/animation/state-graphs.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
