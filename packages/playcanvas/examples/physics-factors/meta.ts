// playcanvas example: Linear and angular factors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Linear and angular factors',
  summary:
    'Three identical crates are thrown with the same sideways velocity and spin. The free one tumbles in 3D, one with linearFactor (1, 1, 0) and angularFactor (0, 0, 1) is confined to the XY plane like a 2D game, and one with angularFactor (0, 0, 0) slides and bounces but can never rotate, the way a character stays upright.',
  section: 'Physics',
  tags: ['linearFactor', 'angularFactor', 'linearVelocity', 'angularVelocity', 'restitution'],
  docs: ['repo/docs/user-manual/physics/rigid-bodies.md', 'repo/docs/user-manual/editor/scenes/components/rigidbody.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
