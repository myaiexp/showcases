// zephyr3d example: Joint motors: velocity, position and maxForce
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Joint motors: velocity, position and maxForce',
  summary:
    'Three hinges with motors: a velocity motor turning at 90°/s, a position motor that works like a servo (stiffness and damping), and a velocity motor whose small motorMaxForce gives up against a heavy block.',
  section: 'Physics',
  tags: ['Joint', 'motorMode', 'motorTarget', 'motorStiffness', 'motorDamping', 'motorMaxForce'],
  docs: ['repo/apps/doc/web/en/physics-joints.md', 'repo/apps/doc/src/tut-79/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
