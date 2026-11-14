// playcanvas example: Hand tracking joints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hand tracking joints',
  summary:
    "With hand tracking an input source carries an XrHand: 25 XrJoints with a position, rotation and radius, grouped into fingers with tips and a wrist. A simulated hand curls and pinches; a cube per joint is sized by joint.radius and placed from getPosition(), exactly as the hand-tracking page builds its model, with bones between neighbours. The full view has curl and pinch sliders and a tracking switch that hides the hand as trackinglost would. In a headset with hand tracking the same view is built from the real joints.",
  section: 'XR',
  tags: ['XrHand', 'XrJoint', 'XrFinger', 'joints', 'radius', 'getPosition', 'tracking', 'trackinglost'],
  docs: ['repo/docs/user-manual/xr/hand-tracking.md', 'repo/docs/user-manual/xr/input-sources.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
