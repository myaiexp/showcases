// zephyr3d example: shapeCast: sweep a shape until it touches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'shapeCast: sweep a shape until it touches',
  summary:
    'world.shapeCast sweeps a sphere, box, capsule or cylinder outwards from the centre of a ring of pillars. The ghost sits at origin + direction × distance where the shape stopped; the hit point is on the pillar\'s surface.',
  section: 'Physics',
  tags: ['shapeCast', 'PhysicsShape', 'distance'],
  docs: ['repo/apps/doc/web/en/physics-scripting.md', 'repo/apps/doc/src/tut-78/main.js', 'repo/apps/doc/web/en/physics-camera.md', 'repo/apps/doc/src/tut-82/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
