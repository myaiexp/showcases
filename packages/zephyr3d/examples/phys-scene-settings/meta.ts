// zephyr3d example: ScenePhysicsSettings: gravity and fixed step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScenePhysicsSettings: gravity and fixed step',
  summary:
    'scene.physicsSettings takes a ScenePhysicsSettings with gravity and fixedTimeStep. Balls thrown up on Earth, Moon, Jupiter or in zero gravity, and a coarser step that makes the simulation visibly rougher.',
  section: 'Physics',
  tags: ['ScenePhysicsSettings', 'gravity', 'fixedTimeStep', 'physicsSettings'],
  docs: ['repo/apps/doc/web/en/physics-intro.md', 'repo/apps/doc/src/tut-76/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
