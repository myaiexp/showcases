// galacean example: Dynamic collider: forces and torque from the keyboard
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: forces and torque from the keyboard",
  summary:
    "The docs' controller script: W, A, S, D push a ball with applyForce, Space jumps with one large applyForce and R spins it with applyTorque. The card plays a scripted run of the same forces.",
  section: "Physics",
  tags: ['DynamicCollider.applyForce', 'DynamicCollider.applyTorque', 'Script.onPhysicsUpdate', 'InputManager.isKeyHeldDown'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
