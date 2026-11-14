// playcanvas example: Ball joint with swing and twist limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ball joint with swing and twist limits',
  summary:
    'Two pendulum arms hang from ball joints with no entityB, which pins entityA to a fixed point in world space. The right arm swings freely through any angle; the left one has enableLimits with swingLimitY, swingLimitZ and twistLimit, and the cone those limits allow is drawn from the pivot. Limits are live: sliders change them while the arm swings.',
  section: 'Physics',
  tags: ['joint', 'JOINTTYPE_BALL', 'enableLimits', 'swingLimitY', 'swingLimitZ', 'twistLimit', 'applyImpulse'],
  docs: ['repo/docs/user-manual/physics/joints.md', 'repo/docs/user-manual/editor/scenes/components/joint.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
