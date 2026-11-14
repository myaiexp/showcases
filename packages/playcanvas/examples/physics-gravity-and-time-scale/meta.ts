// playcanvas example: Gravity, time scale and manual stepping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gravity, time scale and manual stepping',
  summary:
    'ammo.js is loaded before the app starts, then fifteen dynamic boxes and spheres fall onto a static floor. The rigidbody system\'s gravity switches between Earth, Moon and zero; timeScale runs physics in slow motion or pauses it while the rest of the app keeps running; and step(1/60) advances a paused simulation one fixed step at a time. Bodies are reset with teleport, because physics owns a dynamic body\'s transform.',
  section: 'Physics',
  tags: ['RigidBodyComponentSystem', 'gravity', 'timeScale', 'step', 'teleport', 'collision', 'rigidbody'],
  docs: ['repo/docs/user-manual/physics/physics-basics.md', 'repo/docs/user-manual/physics/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
