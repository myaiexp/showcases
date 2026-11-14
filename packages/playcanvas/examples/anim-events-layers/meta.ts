// playcanvas example: Animation events on several layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation events on several layers',
  summary:
    "Each layer fires the events of the clips it plays, even at a weight of 0. A walk clip with a beat event plays on two layers, so every beat fires twice and launches two balls from the same spot; the counter shows the rate doubling. The second layer's weight changes nothing about that.",
  section: 'Animation',
  tags: ['AnimEvents', 'AnimComponentLayer', 'addLayer', 'weight', 'AnimComponent', 'on'],
  docs: [
    'repo/docs/user-manual/animation/events.md',
    'repo/docs/user-manual/animation/layers-and-masks.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
