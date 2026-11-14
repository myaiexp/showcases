// playcanvas example: Breakable fixed joints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Breakable fixed joints',
  summary:
    'A tower of blocks welded together with fixed joints, the bottom one welded to the floor, and a heavy ball fired at it. Each weld has a breakImpulse; the ones that take more than that give way, fire the break event and set isBroken, and the blocks move independently. After a reset, refreshFrames() re-attaches every joint from the blocks\' new transforms. breakImpulse is a live slider.',
  section: 'Physics',
  tags: ['joint', 'JOINTTYPE_FIXED', 'breakImpulse', 'isBroken', 'break', 'refreshFrames', 'teleport'],
  docs: ['repo/docs/user-manual/physics/joints.md', 'repo/docs/user-manual/editor/scenes/components/joint.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
