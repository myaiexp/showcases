// playcanvas example: Collision groups and masks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision groups and masks',
  summary:
    'Two identical pens receive a stream of balls. In the right pen the balls collide with each other and pile up. In the left pen they sit in BODYGROUP_USER_1 with a mask of BODYMASK_ALL ^ BODYGROUP_USER_1, so they ignore their own group, fall through one another into a single blob on the floor and still hit the walls. A check box toggles the left pen\'s mask.',
  section: 'Physics',
  tags: ['group', 'mask', 'BODYGROUP_USER_1', 'BODYMASK_ALL', 'rigidbody', 'teleport'],
  docs: ['repo/docs/user-manual/physics/rigid-bodies.md', 'repo/docs/user-manual/editor/scenes/components/rigidbody.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
