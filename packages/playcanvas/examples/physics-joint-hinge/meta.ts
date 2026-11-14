// playcanvas example: Hinge joint with limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hinge joint with limits',
  summary:
    'A door hangs on a hinge joint. The joint entity sits on the hinge line and is turned so its local X axis points up, which is the axis a hinge rotates about; entityA is the dynamic door and entityB the static frame. enableLimits with limits of 0 to 110 degrees, measured from the starting pose, lets it open one way only. Impulses swing it open and shut, and the limit and its switch are live controls.',
  section: 'Physics',
  tags: ['joint', 'JOINTTYPE_HINGE', 'entityA', 'entityB', 'enableLimits', 'limits', 'applyImpulse'],
  docs: ['repo/docs/user-manual/physics/joints.md', 'repo/docs/user-manual/editor/scenes/components/joint.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
