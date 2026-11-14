// babylon-js example: Prestep and setTargetTransform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Prestep and setTargetTransform',
  summary:
    'Three animated bars follow the same sweep into stacks of crates: one moved by editing its node with prestep in teleport mode (disablePreStep = false), one with PhysicsPrestepType.ACTION, and one driven by body.setTargetTransform.',
  section: 'Physics',
  tags: ['disablePreStep', 'setPrestepType', 'PhysicsPrestepType', 'setTargetTransform', 'PhysicsMotionType.ANIMATED'],
  docs: [
    'repo/content/features/featuresDeepDive/physics/v2/prestep.md',
    'repo/content/features/featuresDeepDive/physics/v2/rigidBodies.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
