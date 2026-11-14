// babylon-js example: Character controller on stairs and a platform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Character controller on stairs and a platform',
  summary:
    'A PhysicsCharacterController capsule climbs stairs (maxStepHeight), jumps and rides an ANIMATED platform through the checkSupport, setVelocity and integrate loop. WASD, arrows and space drive it in the full view; cards run a scripted walk.',
  section: 'Physics',
  tags: ['PhysicsCharacterController', 'checkSupport', 'integrate', 'setVelocity', 'calculateMovementToRef', 'maxStepHeight', 'kinematic platform'],
  docs: [
    'repo/content/features/featuresDeepDive/physics/v2/characterController.md',
    'repo/content/features/featuresDeepDive/physics/v2/rigidBodies.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
