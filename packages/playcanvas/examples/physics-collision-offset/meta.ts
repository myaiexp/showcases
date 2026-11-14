// playcanvas example: Offsetting a collision shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Offsetting a collision shape',
  summary:
    'A character mesh whose origin is at its feet, with the translucent capsule showing where its collider sits. Without an offset the capsule is centred on the origin and the character hovers a metre up; linearOffset raises the shape so the feet touch the floor. On the right a static ramp is tilted purely with angularOffset while its entity stays unrotated.',
  section: 'Physics',
  tags: ['linearOffset', 'angularOffset', 'collision', 'rigidbody'],
  docs: ['repo/docs/user-manual/physics/collision-shapes.md', 'repo/docs/user-manual/editor/scenes/components/collision.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
