// galacean example: Fixed time step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fixed time step",
  summary:
    "A bouncing ball while fixedTimeStep steps through 1/60, 1/30, 1/12 and 1/4 of a second: a script counts its onPhysicsUpdate calls against rendered frames, and the ball moves in ever bigger jumps. The full view has a slider.",
  section: "Physics",
  tags: ['PhysicsScene.fixedTimeStep', 'onPhysicsUpdate', 'engine.time'],
  docs: [
    'repo/docs/en/physics/manager.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
