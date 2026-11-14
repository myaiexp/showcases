// playcanvas example: collisionstart, contact and collisionend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'collisionstart, contact and collisionend',
  summary:
    'Three balls of 1, 3 and 9 kg bounce on three static pads, each listening on its own collision component. collisionstart fires once per touch and its ContactResult carries the other entity and the contact impulse, which sets how brightly the pad flashes; contact fires every physics step while touching and is counted; collisionend hands back the other entity and clears the ball\'s tint.',
  section: 'Physics',
  tags: ['collisionstart', 'contact', 'collisionend', 'ContactResult', 'ContactPoint', 'impulse', 'EventHandle'],
  docs: ['repo/docs/user-manual/physics/collision-events.md', 'repo/docs/user-manual/physics/rigid-bodies.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
